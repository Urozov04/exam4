import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './models/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review) private model:typeof Review
  ){}

  async create(createReviewDto: CreateReviewDto){
    const review=await this.model.create({...createReviewDto})
    return review
  }

  async findAll() {
    const review=await this.model.findAll({include:{model:Review}})
    return review
  }

  async findById(id: number) {
    const review=await this.model.findByPk(id,{include:{model:Review}})
    return review
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review=await this.model.update(updateReviewDto,{where:{id},returning:true})
    return review [1][0]
  }

  async remove(id: number) {
    await this.model.destroy({where:{id}})
    return {data:{}}  
  }
}
