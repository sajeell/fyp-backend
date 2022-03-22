import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ReviewDocument = Review & Document

@Schema()
export class Review {
    @Prop({ required: true })
    comment: string

    @Prop()
    productID: string

    @Prop({ required: true })
    reviewerID: string

    @Prop({ required: true })
    createdAt: Date

    @Prop({ required: true })
    rating: number

    @Prop()
    deletedAt?: Date
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
