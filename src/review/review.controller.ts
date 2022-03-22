import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostReviewProductDTO } from './dto/post-review-product.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor(private readonly service: ReviewService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getProductReview(@Param('id') id) {
        return await this.service.getReviews(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    async postProductReview(@Body() dto: PostReviewProductDTO) {
        return await this.service.postReviewForProduct(dto)
    }

}
