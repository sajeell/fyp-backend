import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Order, OrderDocument } from './order.schema'
import { Model } from 'mongoose'
import { ProductService } from 'src/product/product.service'
import { BiddingService } from 'src/bidding/bidding.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
        private readonly productService: ProductService,
        private readonly biddingService: BiddingService,
        private readonly userService: UserService,

    ) { }

    async findAllViaBuyerID(buyerID: string): Promise<any> {
        const data = await this.model.find({
            buyerID: buyerID,
        })
        return data
    }

    async createBiddingOrder(body: any): Promise<any> {
        const { productID, biddingID, sellerID, price } = body
        this.userService.addFunds(sellerID, price)
        this.productService.decrementProductStock(productID)
        this.biddingService.deleteByBiddingID(biddingID)
        const data = await new this.model({
            ...body,
            createdAt: new Date(),
        }).save()

        return data
    }

}
