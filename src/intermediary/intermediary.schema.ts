import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type IntermediaryDocument = Intermediary & Document

@Schema()
export class Intermediary {
    @Prop()
    productID: string

    @Prop({ type: Number })
    commission: Number

    @Prop({ type: Number })
    revenue: Number

    @Prop({ required: true })
    createdAt: Date

    @Prop()
    deletedAt?: Date
}

export const IntermediarySchema = SchemaFactory.createForClass(Intermediary)
