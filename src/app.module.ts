import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { ProductModule } from './product/product.module'
import { BiddingModule } from './bidding/bidding.module'
import { ReviewModule } from './review/review.module'
import { PaymentModule } from './payment/payment.module'

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
