import { Project } from 'src/project/entities/project.entity';
import { UserEntity } from 'src/users/entities/UserEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const TASK_STATUSES = {
  DONE: 'DONE',
  IN_PROGRESS: 'IN_PROGRESS',
  TODO: 'TODO',
};

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    default: TASK_STATUSES.TODO,
    nullable: false,
    enum: Object.values(TASK_STATUSES),
  })
  status: string;

  @Column({ name: 'created_at', default: new Date(), nullable: true })
  createdAt: Date;

  @Column({ name: 'updated_at', default: new Date(), nullable: true })
  updatedAt: Date;

  @Column({ name: 'finished_at', nullable: true })
  finishedAt: Date;

  @Column({ name: 'start_date', nullable: true })
  startDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { nullable: false })
  user: UserEntity;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
