import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order, OrderDocument } from './order.schema'
import { Model } from 'mongoose'
import { ProductService } from 'src/product/product.service'

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
        private readonly productService: ProductService,
    ) { }

    async findAllViaBuyerID(buyerID: string): Promise<any> {
        const data = await this.model.find({
            buyerID: buyerID,
        })
        return data
    }

    async createBiddingOrder(body: any): Promise<any> {
        const { productID } = body
        this.productService.decrementProductStock(productID)

        const data = await new this.model({
            ...body,
            createdAt: new Date(),
        }).save()

        return data
    }

}
