import { BaseUserDto } from "./base-user.dto";

export class LoginUserDTO extends BaseUserDto {
    username: string;
    email: string;
    password: string;
    role: string;
}