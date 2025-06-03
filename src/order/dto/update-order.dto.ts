import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from 'src/constants';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
