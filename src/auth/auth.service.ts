import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/entities/UserEntity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user)
      throw new UnauthorizedException({ message: 'User does not registered' });

    try {
      const result = await bcrypt.compare(pass, user.password);
      if (!result)
        throw new UnauthorizedException({ message: 'Password is incorrect' });
    } catch (e) {
      throw new UnauthorizedException({ message: 'Something went wrong' });
    }

    const jwtPayload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(jwtPayload),
    };
  }

  async signUp(username: string, pass: string): Promise<{ user: string }> {
    const user = await this.usersService.findOne(username);
    if (user && user.username === username)
      throw new UnauthorizedException({ message: 'User already registered' });
    let newUser: UserEntity | null = null;
    try {
      const hash = await bcrypt.hash(pass, 10);
      newUser = await this.usersService.create({ username, password: hash });
    } catch (e) {
      this.logger.error(e);
      throw new UnauthorizedException({ message: 'Error while sign up' });
    }

    return {
      user: newUser.username,
    };
  }
}
