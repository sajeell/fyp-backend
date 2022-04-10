import { Injectable } from '@nestjs/common'
import { Model } from "mongoose"
import { InjectModel } from '@nestjs/mongoose';
import { Intermediary, IntermediaryDocument } from './intermediary.schema';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class IntermediaryService {
    constructor(
        @InjectModel(Intermediary.name) private readonly model: Model<IntermediaryDocument>,
        private readonly userService: UserService,
        private readonly productService: ProductService,
    ) { }

    public async fetchIntermediaries(): Promise<any> {
        return await this.userService.fetchIntermediaries()
    }

    public async fetchProductViaIntermediary(id): Promise<any> {
        const intermediaryData = await this.model.findOne({
            _id: id
        })

        return await this.productService.findOneById(intermediaryData.productID)
    }

    public async fetchIntermediariesViaAgentID(agentID: string): Promise<any> {
        const response = await this.model.find({
            agentID: agentID
        })

        return response
    }

    public async postIntermediaryData(data: any): Promise<any> {
        const response = await new this.model({
            ...data,
            createdAt: new Date()
        }).save()

        return response
    }

    public async deductCommission(intermediaryID: any, totalPrice: any, sellerID: any): Promise<any> {
        const intermediaryData = await this.model.findOne({
            _id: intermediaryID
        })

        console.log(intermediaryData)

        const commission: any = intermediaryData.commission
        const newCommission = (commission / 100) * totalPrice

        const response = await this.userService.addFunds(intermediaryData.agentID, newCommission)
        const sellerResponse = await this.userService.addFunds(sellerID, totalPrice - newCommission)

        return sellerResponse
    }
}
