import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { isEmail } from 'class-validator'
import { Model } from 'mongoose'
import { RegisterUserDTO } from './dto/register-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './user.schema'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.model.find().exec()
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findOne({
      where: {
        _id: id,
      },
    })
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.model.findOne({ email: email }).exec()
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.model.findOne({ username: username }).exec()
  }

  async create(registerUserDTO: any): Promise<any> {
    const data = await new this.model({
      ...registerUserDTO,
      createdAt: new Date(),
    })

    const response = await data.save()

    return response
  }

  async addStripeAccountId(username, accountId): Promise<any> {
    const data = this.model.findOneAndUpdate(username, {
      stripeAccountId: accountId,
    })
    const response = await data.exec()

    return response.toJSON()
  }

  async addStripeCustomerId(
    username,
    stripeCustomerId,
    stripeCardId,
  ): Promise<any> {
    const data = this.model.findOneAndUpdate(username, {
      stripeCustomerId: stripeCustomerId,
      stripeCardId: stripeCardId,
    })
    const response = await data.exec()

    return response
  }

  async addStripeOneCustomerId(userId, stripeCustomerId): Promise<any> {
    const data = this.model.findOneAndUpdate(userId, {
      stripeCustomerId: stripeCustomerId,
    })
    const response = await data.exec()

    return response
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.model.findByIdAndUpdate(id, updateUserDto).exec()
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec()
  }

  async validateEmail(email: string) {
    return isEmail(email)
  }

  async storeAddress(id: string, address: string): Promise<any> {
    const response = await this.model.findOneAndUpdate(
      {
        _id: id,
      },
      {
        address: address,
      },
    )

    return response
  }

  async fetchIntermediaries(): Promise<any> {
    const response = await this.model.find({
      role: "Intermediary"
    })

    return response
  }

  async addFunds(userID: string, funds: number): Promise<any> {
    const response = await this.model.findOneAndUpdate({
      _id: userID
    }, {
      $inc: {
        funds: funds,
      },
    })

    return response
  }
}
