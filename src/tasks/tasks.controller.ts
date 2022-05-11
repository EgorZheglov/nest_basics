import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller(':boardId/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getAllTasks(@Param() params): string {
    return this.taskService.getAllTasks(params.boardId);
  }

  @Get(':id')
  getTask(@Param() params): string {
    return this.taskService.getTask(params.boardId, params.id);
  }

  @Delete(':id')
  deleteTask(@Param() params): string {
    return this.taskService.deleteTask(params.boardId, params.id);
  }

  @Post()
  createTask(@Param() params): string {
    return this.taskService.createTask(params.boardId);
  }

  @Put(':id')
  updateTask(@Param() params): string {
    return this.taskService.updateTask(params.boardId, params.id);
  }
}
