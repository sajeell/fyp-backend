import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class BaseProductDTO {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsString()
  description: string

  @IsNumber()
  stock: number

  @IsNotEmpty()
  @IsString()
  category: string

  @IsArray()
  images: Array<string>

  @IsNotEmpty()
  @IsString()
  sellerID: string

  @IsBoolean()
  featured: boolean
}
