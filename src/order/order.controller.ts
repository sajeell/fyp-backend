import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';

@ApiBearerAuth()
@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private readonly service: OrderService) { }

    @Get('/by/buyer/:id')
    async getOrdersViaBuyerID(@Param('id') id: string) {
        return await this.service.findAllViaBuyerID(id)
    }

    @Post('/create/bidding')
    async createOrderBidding(@Body() body: any) {
        return await this.service.createBiddingOrder(body)
    }
}
