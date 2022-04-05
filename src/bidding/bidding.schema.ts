import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Document } from 'mongoose'

export type BiddingDocument = Bidding & Document

@Schema()
export class Bidding {
  @Prop()
  startsOn: Date

  @Prop({ type: Number })
  incrementPrice: Number

  @Prop({ type: Number })
  minPrice: Number

  @Prop()
  duration: number

  @Prop()
  status: string

  @Prop()
  wonBy: string

  @Prop({ type: Number })
  winningPrice: Number

  @Prop()
  productID: string

  @Prop()
  participants: Array<any>

  @Prop({ required: true })
  createdAt: Date

  @Prop()
  deletedAt?: Date
}

export const BiddingSchema = SchemaFactory.createForClass(Bidding)
