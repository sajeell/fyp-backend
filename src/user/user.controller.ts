import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index() {
    return await this.service.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.service.update(id, updateUserDto)
  }

  @Put('address/:id')
  async addAddress(@Param('id') id: string, @Body() body: any) {
    const { address } = body
    return await this.service.storeAddress(id, address)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id)
  }
}
