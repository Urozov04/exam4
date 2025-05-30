import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './models/review.entity';
import { sucResponse } from 'src/utils/success-response';
import { catchError } from 'src/utils/catch-error';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review) private model:typeof Review
  ){}

  async create(createReviewDto: CreateReviewDto){
    try {
      const review=await this.model.create({...createReviewDto})
      return sucResponse('New Review creater',review)
    } catch (error) {
      return catchError(error)
    }
  }

  async findAll() {
    try {
      const review=await this.model.findAll()
      return sucResponse('All Review',review)
    } catch (error) {
      return catchError(error)
    }
  }

  async findById(id: number) {
    try {
      const review=await this.model.findByPk(id);
      return sucResponse(`Review by element`, review)
    } catch (error) {
      return catchError(error)
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      const review=await this.model.update(updateReviewDto,{where:{id},returning:true})
      return sucResponse(`Review update by id`, review)
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
