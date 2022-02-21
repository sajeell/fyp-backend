import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class BaseProductDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  sellerID: string;

  @IsBoolean()
  featured: boolean;
}
