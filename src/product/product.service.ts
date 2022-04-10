import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseProductDTO } from './dto/base-product.dto'
import { Product, ProductDocument } from './product.schema'
import {
  CollectionDto,
  DocumentCollector,
  CollectionResponse,
} from '@forlagshuset/nestjs-mongoose-paginate'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
  ) { }

  async findAll(
    collectionDto: CollectionDto,
  ): Promise<CollectionResponse<ProductDocument>> {
    const collector = new DocumentCollector<ProductDocument>(this.model)
    return collector.find(collectionDto)
  }

  async findOneById(id: string): Promise<any> {
    try {
      const data = await this.model.findOne({
        _id: id
      })

      if (data === null) {
        return {
          message: 'Not Found',
        }
      }

      return data
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async create(productDTO: BaseProductDTO): Promise<any> {
    const data = await new this.model({
      ...productDTO,
      createdAt: new Date(),
    }).save()

    return data
  }

  async findFeatured(): Promise<any> {
    const data = await this.model.find({
      where: {
        featured: true,
      },
    })

    return data
  }

  async findFeaturedAntiques(): Promise<any> {
    try {
      const data = await this.model.find({
        featured: true,
        category: 'Antique',
      })

      return data
    } catch (error) {
      console.error(error)
    }
  }

  async getAntique(
    collectionDto: CollectionDto,
  ): Promise<CollectionResponse<ProductDocument>> {
    const { page, limit, filter, sorter } = collectionDto
    const collector = new DocumentCollector<ProductDocument>(this.model)
    return collector.find({
      page,
      limit,
      filter: {
        category: 'Antique',
      },
      sorter,
    })
  }

  async getHandmade(
    collectionDto: CollectionDto,
  ): Promise<CollectionResponse<ProductDocument>> {
    const { page, limit, filter, sorter } = collectionDto
    const collector = new DocumentCollector<ProductDocument>(this.model)
    return collector.find({
      page,
      limit,
      filter: {
        category: 'Handmade',
      },
      sorter,
    })
  }

  async getProductsBySellerID(id): Promise<any> {
    const data = await this.model.find({
      sellerID: id,
    })

    return data
  }

  async findFeaturedHandmade(): Promise<any> {
    const data = await this.model.find({
      featured: true,
      category: 'Handmade',
    })

    return data
  }

  async deleteProduct(id: string): Promise<boolean> {
    const data = await this.model.deleteOne({
      where: {
        _id: id,
      },
    })

    return data.acknowledged
  }

  async decrementProductStock(productID: string): Promise<any> {
    const response = await this.model.findOneAndUpdate(
      {
        _id: productID,
      },
      {
        $inc: {
          stock: -1,
        },
      },
    )

    return response
  }
}
