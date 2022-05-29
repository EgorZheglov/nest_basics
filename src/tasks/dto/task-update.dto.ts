import { TaskStatus } from 'src/types';

export default class UpdateTaskDto {
  title?: string;
  description?: string;
  user?: string;
  status?: TaskStatus;
}
