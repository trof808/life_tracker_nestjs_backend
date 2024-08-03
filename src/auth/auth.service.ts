import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // TODO: add bcrypt for pass
  // https://github.com/kelektiv/node.bcrypt.js?tab=readme-ov-file#readme
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user)
      throw new UnauthorizedException({ message: 'User does not registered' });
    if (user.password !== pass)
      throw new UnauthorizedException({ message: 'Password is incorrect' });

    const jwtPayload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(jwtPayload),
    };
  }
}
