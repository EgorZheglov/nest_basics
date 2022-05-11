import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Get(':id')
  getBoard(@Param() params): string {
    return this.boardService.getBoard(params.id);
  }

  @Get()
  getBoards(): string {
    return this.boardService.getBoards();
  }

  @Delete(':id')
  deleteBoard(@Param() params): string {
    return this.boardService.deleteUser(params.id);
  }

  @Put(':id')
  updateBoard(@Param() params): string {
    return this.boardService.updateBoard(params.id);
  }
}
