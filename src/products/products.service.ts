import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.models';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel (Product) private model: typeof Product
  ) {}

  async create(createProductDto: CreateProductDto){
    try {
      const { name } = createProductDto;
      const product = await this.model.findOne({where: {name}})
      if(product) {
        throw new ConflictException ('Product already exists')
      };
      const newProduct = await this.model.create({
        ...createProductDto,

      })
      return {
        statusCode: 201,
        message: "Product created successfully",
        data: newProduct
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
