import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, JwtService],
})
export class TasksModule {}
