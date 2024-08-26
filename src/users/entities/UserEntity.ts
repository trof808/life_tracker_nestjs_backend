import { Project } from 'src/project/entities/project.entity';
import { TaskEntity } from 'src/tasks/entities/TaskEntity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: true })
  username: string;

  @Column({ length: 500, nullable: true })
  telegramId: string;

  @Column({ nullable: true })
  password: string;

  @Column({ name: 'created_at', default: new Date(), nullable: true })
  createdAt: Date;

  @Column({ name: 'updated_at', default: new Date(), nullable: true })
  updatedAt: Date;

  @OneToMany(() => TaskEntity, (taskItem) => taskItem.user)
  tasks: TaskEntity[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
