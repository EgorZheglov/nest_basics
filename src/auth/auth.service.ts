import { Injectable } from '@nestjs/common';
import to from 'await-to-js';
import CreateUserDto from 'src/users/dto/create-user.dto';
import User from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async sigunp(createUserDto: CreateUserDto): Promise<User> {
    const [err, result] = await to(this.userService.createUser(createUserDto));

    if (err) throw err;

    return result;
  }
}
