import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import to from 'await-to-js';
import CreateUserDto from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import LoginUserDto from './dto/login-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  async signupUser(@Body() createUserDto: CreateUserDto) {
    const [err, result] = await to(this.authService.sigunp(createUserDto));

    if (err) return err;

    return result;
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const [err, result] = await to(this.authService.login(loginUserDto));

    if (err) return err;

    return result;
  }
}
