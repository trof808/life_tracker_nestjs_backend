import { PartialType } from '@nestjs/swagger';
import { TaskEntity } from '../entities/TaskEntity';

export class CreateTaskDto extends PartialType(TaskEntity) {}
