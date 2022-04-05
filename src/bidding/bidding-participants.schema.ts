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

  @Prop({ type: Number })
  maxPrice: Number

  @Prop({ type: Number })
  currentBid: Number

  @Prop({ required: true })
  createdAt: Date

  @Prop()
  deletedAt?: Date
}

export const BiddingParticipantsSchema =
  SchemaFactory.createForClass(BiddingParticipants)
