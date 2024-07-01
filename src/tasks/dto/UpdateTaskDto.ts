import { PartialType } from '@nestjs/swagger';
import { TaskEntity } from '../entities/TaskEntity';

export class UpdateTaskDto extends PartialType(TaskEntity) {}
