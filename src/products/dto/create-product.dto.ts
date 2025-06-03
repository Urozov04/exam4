import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  description: string;

  // @IsString()
  // picture: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  // @IsOptional()
  // @IsNumber()
  // sellerId: number
}
