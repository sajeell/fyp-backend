import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bargain, BargainDocument } from './bargain.schema';

@Injectable()
export class BargainService {
    constructor(
        @InjectModel(Bargain.name) private readonly model: Model<BargainDocument>
    ) { }


    async getAllRequests(): Promise<any> {
        try {
            const data = await this.model.find()

            return data
        } catch (error) {
            console.error(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllRequestsAssignedToSeller(sellerID: string): Promise<any> {
        try {
            const data = await this.model.find({
                sellerID: sellerID
            })

            return data
        } catch (error) {
            console.error(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllRequestsOfBuyer(buyerID: string): Promise<any> {
        try {
            const data = await this.model.find({
                buyerID: buyerID
            })

            return data
        } catch (error) {
            console.error(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async postRequest(dto: any): Promise<any> {
        try {
            const data = await new this.model({
                ...dto,
                createdAt: new Date(),
            }).save()

            return data
        } catch (error) {
            console.error(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async acceptRequest(dto: any): Promise<any> {
        try {

            const updateBargain = await this.model.findOneAndUpdate(
                {
                    _id: dto.id,
                },
                {
                    status: 'accepted',
                    sellerID: dto.sellerID
                },
            ).exec()

            console.log(updateBargain._id)

            return updateBargain
        } catch (error) {
            console.error(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async counterOffer(bargainID: string): Promise<any> {
        try {
            const bargainDetails = await this.model.findById(bargainID)

            return bargainDetails
        } catch (error) {
            console.error(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async rejectRequest(dto: any): Promise<any> {
        try {
            const data = await new this.model({
                ...dto,
                createdAt: new Date(),
            }).save()

            return data
        } catch (error) {
            console.error(error)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
