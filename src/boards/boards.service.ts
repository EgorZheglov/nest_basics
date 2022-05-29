import { Injectable } from '@nestjs/common';
import to from 'await-to-js';
import { UpdateResult } from 'typeorm';
import Board from './board.model';
import CreateBoardDto from './dto/create-board.dto';
import UpdateBoardDto from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  async getBoards(): Promise<Board[]> {
    const [err, boards] = await to(Board.find({ relations: ['tasks'] }));

    if (err) throw err;

    return boards;
  }

  async getBoard(id: string): Promise<Board> {
    const [err, board] = await to(
      Board.find({ where: { board_id: id }, relations: ['tasks'] }),
    );

    if (err) throw err;

    return board[0];
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = await Board.create(createBoardDto);
    await Board.save(board);

    return board;
  }

  async updateBoard(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<UpdateResult> {
    const board = await Board.update({ board_id: id }, updateBoardDto);
    return board;
  }

  async deleteBoard(id: string): Promise<string> {
    const [err, result] = await to(Board.delete(id));

    if (err) {
      throw err;
    } else {
      return 'deleted';
    }
  }
}
