import { Injectable, Logger } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { TaskEntity } from './entities/TaskEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async create(task: CreateTaskDto): Promise<TaskEntity> {
    this.logger.log(task);
    try {
      const newTask = this.taskRepository.create(task);
      return this.taskRepository.save(newTask);
    } catch (e) {
      this.logger.log(e);
      return Promise.reject(e);
    }
  }

  async update(id: number, task: UpdateTaskDto): Promise<UpdateResult> {
    this.logger.log(task);
    try {
      return this.taskRepository.update(+id, task);
    } catch (e) {
      this.logger.log(e);
      return Promise.reject(e);
    }
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(+id);
  }
}
