import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { to } from 'await-to-js';
import UpdateUserDto from './dto/update-user.dto';
import AuthGuard from 'src/auth/auth.guard';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUsers() {
    const [err, result] = await to(this.userService.getUsers());

    if (err) {
      return err;
    }

    return result;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param() params) {
    const [err, result] = await to(this.userService.getUser(params.id));

    if (err) {
      return err;
    }

    return result;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  async deleteUser(@Param() params) {
    const [err, result] = await to(this.userService.deleteUser(params.id));

    if (err) {
      return err;
    }

    return result;
  }
}
