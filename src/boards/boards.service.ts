import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  getBoards(): string {
    return '/Get All boards';
  }

  getBoard(id: string): string {
    return '/get board by id ' + id;
  }

  createBoard(): string {
    return 'Board created';
  }

  updateBoard(id: string): string {
    return '/put board with id' + id;
  }

  deleteUser(id: string): string {
    return '/delete board with id ' + id;
  }
}
