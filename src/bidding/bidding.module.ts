import { Module } from '@nestjs/common'
import { BiddingController } from './bidding.controller'
import { BiddingService } from './bidding.service'

@Module({
  controllers: [BiddingController],
  providers: [BiddingService],
  exports: [BiddingService],
})
export class BiddingModule {}
