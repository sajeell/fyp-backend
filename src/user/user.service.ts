import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>) { }

    async findAll(): Promise<User[]> {
        return await this.model.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return await this.model.findById(id).exec();
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.model.findOne({ email: email }).exec();
    }

    async findOneByUsername(username: string): Promise<User> {
        return await this.model.findOne({ username: username }).exec();
    }

    async create(updateUserDto: CreateUserDto): Promise<User> {
        return await new this.model({
            ...updateUserDto,
            createdAt: new Date(),
        }).save();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.model.findByIdAndUpdate(id, updateUserDto).exec();
    }

    async delete(id: string): Promise<User> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
