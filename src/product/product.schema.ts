import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProductDocument = Product & Document

@Schema()
export class Product {
  @Prop({ required: true })
  title: string

  @Prop()
  description: string

  @Prop({ required: true })
  category: string

  @Prop({ default: false })
  featured: boolean

  @Prop({ required: true })
  sellerID: string

  @Prop({ required: true })
  createdAt: Date

  @Prop()
  deletedAt?: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product)
