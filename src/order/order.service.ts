import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { catchError } from 'src/utils/catch-error';
import { sucResponse } from 'src/utils/success-response';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private model:typeof Order
  ){}

  async create(createOrderDto: CreateOrderDto){
    try {
      const order=await this.model.create({...createOrderDto})
      return sucResponse('New Order creater',order)
    } catch (error) {
      return catchError(error)
    }
  }

  async findAll() {
    try {
      const order=await this.model.findAll()
      return sucResponse('All Order',order)
    } catch (error) {
      return catchError(error)
    }
  }

  async findById(id: number) {
    try {
      const order=await this.model.findByPk(id);
      return sucResponse(`Order by element`, order)
    } catch (error) {
      return catchError(error)
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const order=await this.model.update(updateOrderDto,{where:{id},returning:true})
      return sucResponse(`Order update by id`, order)
    } catch (error) {
      return catchError(error)
    }
  }

  async remove(id: number) {
    try {
      await this.model.destroy({where:{id}})
      return {data:{}}
    } catch (error) {
      return catchError(error)
    }  
  }
}
