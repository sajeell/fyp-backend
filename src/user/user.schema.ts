import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
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

  @Prop()
  address?: string

  @Prop({ unique: true })
  username?: string

  @Prop({ unique: true })
  email?: string

  @Prop()
  password?: string

  @Prop({ type: Number })
  funds: number

  @Prop({ required: true })
  createdAt: Date

  @Prop()
  deletedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
