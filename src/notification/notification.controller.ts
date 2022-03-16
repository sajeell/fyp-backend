import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { NotificationService } from './notification.service'

@Controller('notification')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async notify() {
    return await this.service.notifyUser()
  }
}
