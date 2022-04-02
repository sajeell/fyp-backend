import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { NotificationService } from 'src/notification/notification.service'
import { BiddingController } from './bidding.controller'
import { Bidding, BiddingSchema } from './bidding.schema'
import { BiddingService } from './bidding.service'

@Module({
  controllers: [BiddingController],
  providers: [BiddingService, NotificationService],
  imports: [
    MongooseModule.forFeature([{ name: Bidding.name, schema: BiddingSchema }]),
  ],
  exports: [BiddingService],
})
export class BiddingModule { }
