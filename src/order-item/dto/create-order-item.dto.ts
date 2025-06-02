import { IsOptional, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  @IsOptional()
  paymentType: string;

  @IsString()
  @IsOptional()
  address: string;
}
