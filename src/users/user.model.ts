import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import Task from '../tasks/task.model';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/common/config';

@Entity('user')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, SALT_OR_ROUNDS);
  }
}
