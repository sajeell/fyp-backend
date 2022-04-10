import { Injectable } from '@nestjs/common'
import { Model } from "mongoose"
import { InjectModel } from '@nestjs/mongoose';
import { Intermediary, IntermediaryDocument } from './intermediary.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class IntermediaryService {
    constructor(
        @InjectModel(Intermediary.name) private readonly model: Model<IntermediaryDocument>,
        private readonly userService: UserService
    ) { }

    public async fetchIntermediaries(): Promise<any> {
        return await this.userService.fetchIntermediaries()
    }

    public async postIntermediaryData(data: any): Promise<any> {
        const response = await new this.model({
            ...data,
            createdAt: new Date()
        }).save()

        return response
    }
}
