import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private model:typeof Order
  ){}

  async create(createOrderDto: CreateOrderDto){
    const order=await this.model.create({...createOrderDto})
    return order
  }

  async findAll() {
    const order=await this.model.findAll({include:{model:Order}})
    return order
  }

  async findById(id: number) {
    const order=await this.model.findByPk(id,{include:{model:Order}})
    return order
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order=await this.model.update(updateOrderDto,{where:{id},returning:true})
    return order [1][0]
  }

  async remove(id: number) {
    await this.model.destroy({where:{id}})
    return {data:{}}  
  }
}
