import { Injectable } from '@nestjs/common';
import { to } from 'await-to-js';
import { UpdateResult } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './user.model';
import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/common/config';

@Injectable()
export class UsersService {
  async getUsers(): Promise<User[]> {
    const [err, users] = await to(User.find({ relations: ['tasks'] }));

    if (err) throw err;

    return users;
  }

  async findByLogin(login: string): Promise<User> {
    const [err, result] = await to(User.findOne({ login: login }));

    if (!result) throw 'not found';

    if (err) throw err;

    return result;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = User.create(createUserDto);

    await User.save(user);

    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        SALT_OR_ROUNDS,
      );
    }
    const board = await User.update({ id: id }, updateUserDto);

    return board;
  }

  async getUser(id: string): Promise<User> {
    const [err, user] = await to(
      User.findOne({ where: { id: id }, relations: ['tasks'] }),
    );

    if (err) throw err;

    return user;
  }

  async deleteUser(id: string): Promise<string> {
    const [err, result] = await to(User.delete(id));

    if (err) throw err;

    return 'deleted';
  }
}
