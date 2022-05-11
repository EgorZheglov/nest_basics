import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  controllers: [],
  providers: [],
  imports: [UsersModule, BoardsModule, TasksModule],
})
export class AppModule {}
