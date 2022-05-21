import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { BargainModule } from './bargain/bargain.module'
import { BiddingModule } from './bidding/bidding.module'
import { IntermediaryModule } from './intermediary/intermediary.module'
import { OrderModule } from './order/order.module'
import { PaymentModule } from './payment/payment.module'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './review/review.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:12345@fyp.iydmr.mongodb.net/FYP?retryWrites=true&w=majority',
    ),
    AuthModule,
    ProductModule,
    BiddingModule,
    ReviewModule,
    PaymentModule,
    IntermediaryModule,
    OrderModule,
    BargainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
