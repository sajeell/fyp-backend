import { Injectable } from '@nestjs/common';
import { LoginUserDTO } from 'src/user/dto/login-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }


    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);

        const validPassword = await bcrypt.compare(password, user.password)

        if (validPassword == true) {
            const { password, ...result } = user;
            return result;
        }


        return null;
    }

    async login(user: LoginUserDTO) {
        const payLoad = { username: user.username }

        return {
            statusCode: 200,
            access_token: this.jwtService.sign(payLoad),
        };
    }
}