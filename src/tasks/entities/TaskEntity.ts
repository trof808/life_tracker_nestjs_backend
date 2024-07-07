import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false, nullable: true })
  done: boolean;

  @Column({ name: 'created_at', default: new Date(), nullable: true })
  createdAt: Date;

  @Column({ name: 'updated_at', default: new Date(), nullable: true })
  updatedAt: Date;

  @Column({ name: 'finished_at', nullable: true })
  finishedAt: Date;

  @Column({ name: 'to_do_date', nullable: true })
  toDoDate: Date;
}
