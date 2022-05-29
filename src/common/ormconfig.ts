import { ConnectionOptions } from 'typeorm';
import {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_CONTAINERPORT,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from './config';
import User from '../users/user.model';
import Board from '../boards/board.model';
import Task from '../tasks/task.model';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_CONTAINERPORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: false,
  synchronize: true,
  entities: [User, Board, Task],
  migrations: ['../db/migrations/*.ts'],
};

export default ormConfig;
