import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index() {
    return await this.service.findAll()
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.service.update(id, updateUserDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id)
  }
}
