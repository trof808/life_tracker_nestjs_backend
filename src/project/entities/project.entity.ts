import { TaskEntity } from 'src/tasks/entities/TaskEntity';
import { UserEntity } from 'src/users/entities/UserEntity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'created_at', default: new Date(), nullable: true })
  createdAt: Date;

  @Column({ name: 'updated_at', default: new Date(), nullable: true })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { nullable: false })
  user: UserEntity;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: TaskEntity;
}
