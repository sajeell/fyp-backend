import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Document } from 'mongoose'

export type BiddingDocument = Bidding & Document

@Schema()
export class Bidding {
  @Prop()
  startsOn: Date

  @Prop()
  incrementPrice: number

  @Prop()
  minPrice: number

  @Prop()
  duration: number

  @Prop()
  status: string

  @Prop()
  wonBy: string

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
