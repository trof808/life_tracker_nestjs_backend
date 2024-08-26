import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/UserEntity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    this.logger.log(user);
    try {
      const newUser = this.userRepository.create(user);
      return this.userRepository.save(newUser);
    } catch (e) {
      this.logger.log(e);
      return Promise.reject(e);
    }
  }
}
