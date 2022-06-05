import { Injectable } from '@nestjs/common';
import to from 'await-to-js';
import errmessages from 'src/common/errmessages';
import CreateUserDto from 'src/users/dto/create-user.dto';
import User from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import LoginUserDto from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async sigunp(createUserDto: CreateUserDto): Promise<User> {
    const [err, result] = await to(this.userService.createUser(createUserDto));

    if (err) throw err;

    return result;
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const [err, result] = await to(
      this.userService.findByLogin(loginUserDto.login),
    );

    if (err) throw err;

    if (!result) throw errmessages.ERROR_LOGIN;

    const compared = await bcrypt.hash(loginUserDto.password, result.password);

    if (!compared) {
      throw errmessages.ERROR_LOGIN;
    }

    return this.jwtService.sign(result.id);
  }
}
