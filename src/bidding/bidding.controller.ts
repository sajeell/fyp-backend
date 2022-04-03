import { Controller, Post, Body, Param, Get } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { BiddingService } from './bidding.service'

@ApiBearerAuth()
@ApiTags('Bidding')
@Controller('bidding')
export class BiddingController {
  constructor(private readonly service: BiddingService) { }

  @Get('/start')
  async biddingStart() {
    const date = new Date()
    this.service.setStartTime(date)
    return await this.service.biddingStart()
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addBiddingDetails(@Body() dto: any) {
    return await this.service.addBiddingDetails(dto)
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/add/participant')
  async addParticipant(@Body() dto: any) {
    return await this.service.addBiddingParticipant(dto)
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/participant/by/:id')
  async fetchBiddingParticipantDetail(@Param('id') id: string) {
    return await this.service.fetchBiddingParticipant(id)
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/participant/cart/:id')
  async fetchParticipantCartDetails(@Param('id') userID: string) {
    return await this.service.fetchBiddingParticipant(userID)
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/by/:id')
  async fetchBiddingDetails(@Param('id') id: string) {
    return await this.service.fetchBiddingDetails(id)
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/verify/user/bidding')
  async verifyUserBidding(@Body() dto: any) {
    const { userID, productID } = dto
    return await this.service.checkUserHadBidOrNot(userID, productID)
  }
}
