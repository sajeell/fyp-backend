const bcrypt = require('bcrypt')

import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async index() {
        return await this.service.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: string) {
        return await this.service.findOne(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const salt = await bcrypt.genSalt(9)
        const bcryptPassword = await bcrypt.hash(createUserDto.password, salt)
        createUserDto.password = bcryptPassword
        return await this.service.create(createUserDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.service.update(id, updateUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.service.delete(id);
    }
}
