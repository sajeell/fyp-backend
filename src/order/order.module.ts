import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from 'src/product/product.module'
import { OrderController } from './order.controller'
import { Order, OrderSchema } from './order.schema'
import { OrderService } from './order.service'

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    ProductModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  exports: [OrderService],
})
export class OrderModule {}
