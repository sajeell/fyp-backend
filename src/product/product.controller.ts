import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationParams } from 'src/pagination-params';
import { BaseProductDTO } from './dto/base-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly service: ProductService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Query() { skip, limit }: PaginationParams) {
        return await this.service.findAll(skip, limit)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProduct(@Body() productDTO: BaseProductDTO) {
        return await this.service.create(productDTO)
    }

    @UseGuards(JwtAuthGuard)
    @Get('featured')
    async getFeatured() {
        return await this.service.findFeatured()
    }
}
