import { Module } from '@nestjs/common'
import { NotificationService } from 'src/notification/notification.service'
import { BiddingController } from './bidding.controller'
import { BiddingService } from './bidding.service'

@Module({
  imports: [NotificationService],
  controllers: [BiddingController],
  providers: [BiddingService],
  exports: [BiddingService],
})
export class BiddingModule {}
