import { BaseUserDto } from './base-user.dto';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDTO extends BaseUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: string;
}
