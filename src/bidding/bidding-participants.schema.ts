import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type BiddingParticipantsDocument = BiddingParticipants & Document

@Schema()
export class BiddingParticipants {
  @Prop()
  biddingID: string

  @Prop()
  userID: string

  @Prop()
  intermediaryID: string

  @Prop()
  email: string

  @Prop()
  maxPrice: number

  @Prop()
  currentBid: number

  @Prop({ required: true })
  createdAt: Date

  @Prop()
  deletedAt?: Date
}

export const BiddingParticipantsSchema =
  SchemaFactory.createForClass(BiddingParticipants)
