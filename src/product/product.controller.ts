import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationParams } from 'src/pagination-params';
import { BaseProductDTO } from './dto/base-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Query() { skip, limit }: PaginationParams) {
    return await this.service.findAll(skip, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Body() productDTO: BaseProductDTO) {
    return await this.service.create(productDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('featured')
  async getFeatured() {
    return await this.service.findFeatured();
  }

  @UseGuards(JwtAuthGuard)
  @Get('featured-antiques')
  async getFeaturedAntiques() {
    return await this.service.findFeaturedAntiques();
  }

  @UseGuards(JwtAuthGuard)
  @Get('featured-handmade')
  async getFeaturedHandmade() {
    return await this.service.findFeaturedHandmade();
  }

  @UseGuards(JwtAuthGuard)
  @Get('antiques')
  async getAntiques() {
    return await this.service.findAntiques();
  }

  @UseGuards(JwtAuthGuard)
  @Get('handmade')
  async getHandmade() {
    return await this.service.findHandmade();
  }
}
