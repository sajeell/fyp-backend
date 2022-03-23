import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseProductDTO } from './dto/base-product.dto'
import { Product, ProductDocument } from './product.schema'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
  ) {}

  async findAll(
    documentsToSkip = 0,
    limitOfDocuments?: number,
  ): Promise<Product[]> {
    const query = this.model.find().sort({ _id: 1 }).skip(documentsToSkip)

    if (limitOfDocuments) {
      query.limit(limitOfDocuments)
    }
    return query
  }

  async findOneById(id: string): Promise<any> {
    try {
      const data = await this.model.findById(id)

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

  async findAntiques(): Promise<any> {
    const data = await this.model.find({
      category: 'Antique',
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

  async findHandmade(): Promise<any> {
    const data = await this.model.find({
      category: 'Handmade',
    })

    return data
  }

  /**
   *
   * @param id : string
   * @returns true if product is successfully deleted
   */
  async deleteProduct(id: string): Promise<boolean> {
    const data = await this.model.deleteOne({
      where: {
        _id: id,
      },
    })

    return data.acknowledged
  }
}
