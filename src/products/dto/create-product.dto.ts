import {
  IsNotEmpty,
  IsNumber,
  IsString
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

  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
