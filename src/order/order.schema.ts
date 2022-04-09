import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type OrderDocument = Order & Document

@Schema()
export class Order {
    @Prop()
    productID: string

    @Prop()
    buyerID?: string

    @Prop({ type: Number })
    price: number

    @Prop()
    biddingID: string

    @Prop()
    bargainingID: string

    @Prop()
    status?: string

    @Prop()
    paymentStatus?: string

    @Prop({ required: true })
    createdAt: Date

    @Prop()
    archived: Boolean

    @Prop()
    deletedAt?: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order)
