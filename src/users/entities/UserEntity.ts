import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ name: 'created_at', default: new Date(), nullable: true })
  createdAt: Date;

  @Column({ name: 'updated_at', default: new Date(), nullable: true })
  updatedAt: Date;
}
