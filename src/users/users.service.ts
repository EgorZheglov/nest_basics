import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers(): string {
    return '/Get users result';
  }

  getUser(id: string): string {
    return '/get by id ' + id;
  }

  deleteUser(id: string): string {
    return '/delete user with id ' + id;
  }
}
