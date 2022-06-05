import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import to from 'await-to-js';
import AuthGuard from 'src/auth/auth.guard';
import { BoardsService } from './boards.service';
import CreateBoardDto from './dto/create-board.dto';
import UpdateBoardDto from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  async getBoard(@Param() params) {
    const [err, result] = await to(this.boardService.getBoard(params.id));

    if (err) {
      return err;
    }

    return result;
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    const [err, result] = await to(
      this.boardService.createBoard(createBoardDto),
    );

    if (err) return err;

    return result;
  }

  @Get()
  @UseGuards(AuthGuard)
  async getBoards() {
    const [err, result] = await to(this.boardService.getBoards());

    if (err) {
      return err;
    }

    return result;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async deleteBoard(@Param() params) {
    const [err, result] = await to(this.boardService.deleteBoard(params.id));

    if (err) {
      return err;
    }

    return 'deleted';
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateBoard(@Param() params, @Body() updateBoardDto: UpdateBoardDto) {
    //TODO: encrypt updating password
    const [err, result] = await to(
      this.boardService.updateBoard(params.id, updateBoardDto),
    );

    if (err) return err;

    return 'updated';
  }
}
