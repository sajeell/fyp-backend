import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './review.schema';
import { Model } from 'mongoose'
import { PostReviewProductDTO } from './dto/post-review-product.dto';


@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private readonly model: Model<ReviewDocument>,
    ) { }

    /**
     * 
     * @param args : PostReviewProductDTO
     * @returns review add for a product
     */
    async postReviewForProduct(args: PostReviewProductDTO): Promise<any> {
        const data = await new this.model({
            ...args,
            createdAt: new Date(),
        }).save()

        return data
    }

    /**
     * 
     * @param id : Product ID to obtain it's reviews
     * @returns 
     */
    async getReviews(id: string) {
        try {
            const data = await this.model.find({
                where: {
                    productID: id
                }
            })

            if (data.length < 1) {
                return {
                    message: 'Not Found'
                }
            }

            return data
        } catch (error) {
            console.error(error)
        }

    }
}
