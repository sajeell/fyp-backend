import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class PostReviewProductDTO {
    @IsNotEmpty()
    @IsString()
    comment: string

    @IsNotEmpty()
    @IsString()
    productID: string

    @IsNotEmpty()
    @IsString()
    reviewerID: string

    @IsNumber()
    rating: number
}
