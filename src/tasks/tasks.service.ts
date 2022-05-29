import { Injectable } from '@nestjs/common';
import to from 'await-to-js';
import { UpdateResult } from 'typeorm';
import CreateTaskDto from './dto/task-create.dto';
import UpdateTaskDto from './dto/task-update.dto';
import Task from './task.model';

@Injectable()
export class TasksService {
  async getTasks(boardId: string): Promise<Task[]> {
    const [err, result] = await to(Task.find({ where: { board: boardId } }));

    if (err) throw err;

    return result;
  }

  async getTask(boardId: string, id: string): Promise<Task> {
    const [err, result] = await to(
      Task.findOne({ where: { task_id: id, board: boardId } }),
    );

    if (err) throw err;

    return result!;
  }

  async deleteTask(boardId: string, id: string): Promise<string> {
    await Task.delete({ task_id: id, board: boardId });
    return 'task deleted';
  }

  async updateTask(
    updateTaskDto: UpdateTaskDto,
    boardId: string,
    taskId: string,
  ): Promise<UpdateResult> {
    const task = await Task.update(
      { task_id: taskId, board: boardId },
      updateTaskDto,
    );

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = Task.create(createTaskDto);
    const [err, result] = await to(Task.save(task));

    if (err) throw err;
    return result;
  }
}
