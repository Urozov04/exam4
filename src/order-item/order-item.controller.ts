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
import { CheckRoles } from 'src/decorators/role.decorator';
import { UserRoles } from 'src/constants';
import { RolesGuard } from 'src/guards/user.guard';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.CUSTOMER)
  @Post()
  async create(
    @UserDecorator() user: any,
    @Body()
    data: CreateOrderItemDto,
  ) {
    return this.orderItemService.create(user, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.CUSTOMER)
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.orderItemService.getById(+id);
  }
}
