import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { NotificationService } from 'src/notification/notification.service'
import { BiddingService } from './bidding.service'

@Controller('bidding')
export class BiddingController {
  constructor(private readonly service: BiddingService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async biddingStart() {
    const date = new Date()
    this.service.setStartTime(date)
    setInterval(() => { }, 5000)
    return await this.service.biddingStart()
  }
}
