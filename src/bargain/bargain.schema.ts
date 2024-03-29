import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type BargainDocument = Bargain & Document

@Schema()
export class Bargain {
    @Prop({ type: Number })
    incrementPrice: Number

    @Prop({ type: Number })
    currentPrice: Number

    @Prop({ type: Number })
    initialPrice: Number

    @Prop()
    sellerID: string

    @Prop()
    buyerID: string

    @Prop()
    status: string

    @Prop()
    img: string

    @Prop()
    description: string

    @Prop()
    category: string

    @Prop({ type: Number })
    finalPrice: Number

    @Prop({ type: Number })
    highestBudget: Number

    @Prop({ type: Number, default: 0 })
    count: Number

    @Prop({ required: true })
    createdAt: Date

    @Prop()
    deletedAt?: Date
}

export const BargainSchema = SchemaFactory.createForClass(Bargain)
