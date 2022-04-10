import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type IntermediaryDocument = Intermediary & Document

@Schema()
export class Intermediary {
  @Prop()
  productID: string

  @Prop()
  agentID: string

  @Prop({ type: Number })
  commission: Number

  @Prop({ required: true })
  createdAt: Date

  @Prop()
  deletedAt?: Date
}

export const IntermediarySchema = SchemaFactory.createForClass(Intermediary)
