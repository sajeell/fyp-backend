import {
  Body,
  ConsoleLogger,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { RegisterUserDTO } from 'src/user/dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    if (typeof req != undefined) {
      const data = await req.body;
      return await this.service.login(await data);
    }
  }

  @Post('register')
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    const req = registerUserDTO;

    if (typeof req != undefined) {
      const isEmailValid = await this.userService.validateEmail(req.email);

      if (isEmailValid === false) {
        return {
          statusCode: 404,
          message: 'Email not valid',
        };
      }

      const checkUserName = await this.userService.findOneByUsername(
        req.username,
      );

      if (checkUserName !== null) {
        return {
          statusCode: 404,
          message: 'Username already exists',
        };
      }

      const checkEmail = await this.userService.findOneByEmail(req.email);
      if (checkEmail !== null) {
        return {
          statusCode: 404,
          message: 'Email already exists',
        };
      }

      const salt = await bcrypt.genSalt(9);
      const bcryptPassword = await bcrypt.hash(req.password, salt);
      req.password = bcryptPassword;
      await this.userService.create(req);

      return await this.service.login(req);
    }
  }
}
