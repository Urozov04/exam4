import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  description: string;

  // @IsString()
  // image: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
