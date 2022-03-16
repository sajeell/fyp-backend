import { BaseUserDto } from './base-user.dto'
import { IsString } from 'class-validator'

export class RegisterUserDTO extends BaseUserDto {
  @IsString()
  name: string
}
