import { CollectionDto, ValidationPipe } from '@forlagshuset/nestjs-mongoose-paginate'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,

} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { BaseProductDTO } from './dto/base-product.dto'
import { ProductService } from './product.service'
import { Property } from './properties/property'

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Query() query: CollectionDto) {
    return await this.service.findAll(query)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by/:id')
  async getProductById(@Param('id') id) {
    return await this.service.findOneById(id)
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

  @UseGuards(JwtAuthGuard)
  @Get('featured-antiques')
  async getFeaturedAntiques() {
    return await this.service.findFeaturedAntiques()
  }

  @UseGuards(JwtAuthGuard)
  @Get('featured-handmade')
  async getFeaturedHandmade() {
    return await this.service.findFeaturedHandmade()
  }

  @UseGuards(JwtAuthGuard)
  @Get('/category/antique')
  async getAntiques(@Query(new ValidationPipe(Property)) query: CollectionDto) {
    return await this.service.getAntique(query)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/category/handmade')
  async getHandmade(@Query(new ValidationPipe(Property)) query: CollectionDto) {
    return await this.service.getHandmade(query)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id) {
    return await this.service.deleteProduct(id)
  }
}
