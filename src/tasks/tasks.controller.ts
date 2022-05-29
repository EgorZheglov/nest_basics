import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import to from 'await-to-js';
import CreateTaskDto from './dto/task-create.dto';
import UpdateBoa from 'src/boards/dto/update-board.dto';
import { TasksService } from './tasks.service';
import UpdateTaskDto from './dto/task-update.dto';

@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async getTasks(@Param() params) {
    const [err, result] = await to(this.taskService.getTasks(params.boardId));

    if (err) return err;

    return result;
  }

  @Get(':id')
  async getTask(@Param() params) {
    const result = await this.taskService.getTask(params.boardId, params.id);

    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTask(@Param() params) {
    const [err, result] = await to(
      this.taskService.deleteTask(params.boardId, params.id),
    );

    if (err) return err;

    return 'deleted';
  }

  @Post()
  @HttpCode(201)
  async createTask(@Param() params, @Body() createTaskDto: CreateTaskDto) {
    createTaskDto.board = params.boardId;
    const [err, task] = await to(this.taskService.createTask(createTaskDto));

    if (err) return err;

    return task;
  }

  @Put(':id')
  async updateTask(@Param() params, @Body() updateTaskDto: UpdateTaskDto) {
    const [err, task] = await to(
      this.taskService.updateTask(updateTaskDto, params.boardId, params.id),
    );

    if (err) return err;

    return 'updated';
  }
}
