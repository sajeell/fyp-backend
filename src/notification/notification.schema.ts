import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type NotificationDocument = Notification & Document

@Schema()
export class Notification {
  @Prop({ required: true })
  message: string

  @Prop()
  senderId: string

  @Prop({ required: true })
  receiverId: string

  @Prop({ default: false })
  isFromAdmin: boolean

  @Prop({ required: true })
  createdAt: Date

  @Prop()
  deletedAt?: Date
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)
