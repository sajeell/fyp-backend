import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  _id: string

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

export const UserSchema = SchemaFactory.createForClass(User)
