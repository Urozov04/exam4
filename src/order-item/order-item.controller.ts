import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { UserDecorator } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @UserDecorator() user: any,
    @Body()
    data: CreateOrderItemDto,
  ) {
    return this.orderItemService.create(user, data);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.orderItemService.getAll();
  }
}
