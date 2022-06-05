import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, JwtService],
  imports: [AuthModule],
})
export class BoardsModule {}
