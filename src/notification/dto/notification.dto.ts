import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class NotificationDTO {
  @IsNotEmpty()
  @IsString()
  message: string

  @IsString()
  senderId: string

  @IsString()
  receiverId: string

  @IsBoolean()
  isFromAdmin: boolean
}
