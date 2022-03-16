import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { ProductModule } from './product/product.module'
import { NotificationService } from './notification/notification.service'
import { NotificationModule } from './notification/notification.module'
import { BiddingService } from './bidding/bidding.service'
import { BiddingModule } from './bidding/bidding.module'

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:12345@fyp.iydmr.mongodb.net/FYP?retryWrites=true&w=majority',
    ),
    AuthModule,
    ProductModule,
    NotificationModule,
    BiddingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
