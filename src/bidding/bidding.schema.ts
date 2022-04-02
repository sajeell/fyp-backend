import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type BiddingDocument = Bidding & Document

@Schema()
export class Bidding {
  @Prop()
  firstName: string

  @Prop()
  lastName?: string

  @Prop()
  stripeAccountId: string

  @Prop()
  stripeCardId: string

  @Prop()
  stripeCustomerId: string

  @Prop()
  role?: string

  @Prop({ unique: true })
  username?: string

  @Prop({ unique: true })
  email?: string

  @Prop()
  password?: string

  @Prop({ required: true })
  createdAt: Date

  @Prop()
  deletedAt?: Date
}

export const BiddingSchema = SchemaFactory.createForClass(Bidding)
