import { Module } from '@nestjs/common'
import { NotificationService } from 'src/notification/notification.service'
import { BiddingController } from './bidding.controller'
import { BiddingService } from './bidding.service'

@Module({
  controllers: [BiddingController],
  providers: [BiddingService, NotificationService],
  exports: [BiddingService],
})
export class BiddingModule { }
