import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserDto } from './appDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('create_user')
  async createUser(@Payload() payload: CreateUserDto) {
    const user = await this.appService.createUser(payload);
    return user;
  }

}

