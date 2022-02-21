import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class BaseUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  username: string;
}
