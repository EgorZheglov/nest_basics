import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  //  JoinColumn,
} from 'typeorm';
import Task from '../tasks/task.model';

@Entity('board')
export default class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  board_id: string;

  @Column()
  title: string;

  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[];
}
