import { ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { BiddingService } from './bidding.service'

@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Bidding')
@Controller('bidding')
export class BiddingController {
  constructor(private readonly service: BiddingService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async biddingStart() {
    const date = new Date()
    this.service.setStartTime(date)
    setInterval(() => { }, 5000)
    return await this.service.biddingStart()
  }
}
