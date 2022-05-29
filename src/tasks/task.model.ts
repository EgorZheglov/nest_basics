import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskStatus } from '../types';
import User from '../users/user.model';
import Board from '../boards/board.model';

@Entity('task')
export default class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  task_id: string;

  @Column()
  title: string;

  @Column({ default: TaskStatus.TODO })
  status: string;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
    lazy: false,
  })
  user: string;

  @ManyToOne(() => Board, (board) => board.tasks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    lazy: false,
    nullable: false,
  })
  board: string;

  @Column()
  description: string;
}
