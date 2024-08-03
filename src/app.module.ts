import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TasksController } from './tasks/tasks.controller';
// import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { TaskEntity } from './tasks/entities/TaskEntity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { UsersService } from './users/users.service';
import { UserEntity } from './users/entities/UserEntity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [TaskEntity, UserEntity],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    TasksModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
