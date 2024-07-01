import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/TaskEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/CreateTaskDto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async create(task: CreateTaskDto): Promise<TaskEntity> {
    this.logger.log(task);
    return this.taskRepository.create(task);
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }
}
