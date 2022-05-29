import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { to } from 'await-to-js';
import UpdateUserDto from './dto/update-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    const [err, result] = await to(this.userService.getUsers());

    if (err) {
      return err;
    }

    return result;
  }

  @Get(':id')
  async findOne(@Param() params) {
    const [err, result] = await to(this.userService.getUser(params.id));

    if (err) {
      return err;
    }

    return result;
  }

  @Put(':id')
  async updateUser(@Param() params, @Body() updateUserDto: UpdateUserDto) {
    const [err, result] = await to(
      this.userService.updateUser(params.id, updateUserDto),
    );

    if (err) {
      return err;
    }

    return 'updated';
  }

  @Delete(':id')
  async deleteUser(@Param() params) {
    const [err, result] = await to(this.userService.deleteUser(params.id));

    if (err) {
      return err;
    }

    return result;
  }
}
