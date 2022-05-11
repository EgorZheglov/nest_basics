import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers(): string {
    return this.userService.getUsers();
  }

  @Get(':id')
  findOne(@Param() params): string {
    return this.userService.getUser(params.id);
  }

  @Delete(':id')
  deleteUser(@Param() params): string {
    return this.userService.deleteUser(params.id);
  }
}
