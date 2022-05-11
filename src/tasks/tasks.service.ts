import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  getAllTasks(boardId: string) {
    return `get all tasks on board with id: ${boardId}`;
  }

  getTask(boardId: string, id: string): string {
    return `/get task with id ${id} on board with id ${boardId}`;
  }

  deleteTask(boardId: string, id: string): string {
    return `/delte task with id ${id} on board with id ${boardId}`;
  }

  updateTask(boardId: string, id: string): string {
    return `/put task with id ${id} on board with id ${boardId}`;
  }

  createTask(boardId): string {
    return `task created`;
  }
}
