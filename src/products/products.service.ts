import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.models';
import { sucResponse } from 'src/utils/success-response';
import { catchError } from 'src/utils/catch-error';
import { Category } from 'src/categories/models/category.models';
import { FileService } from 'src/file/file.service';
import { ImagesOfProduct } from './models/image-of-product.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private model: typeof Product,
    @InjectModel(ImagesOfProduct) private imageModel: typeof ImagesOfProduct,
    private readonly sequelize:Sequelize,
    private readonly fileService:FileService
) {}

  async create(user: any, createProductDto: CreateProductDto,files?:Express.Multer.File[]) {
    const transaction=await this.sequelize.transaction()
    try {
      const { id } = user;
      const { name } = createProductDto;
      const lower = String(name).toLowerCase();
      const existProduct = await this.model.findOne({ where: { name: lower } ,transaction});
      if (existProduct) {
        throw new ConflictException('Product already exists');
      }
      const newProduct = await this.model.create({
        ...createProductDto,
        name: lower,
        sellerId: id,
      },{transaction});
      const imageUrl:string[]=[]
      if(files && files.length>0){
        for(let file of files){
          imageUrl.push(await this.fileService.createFile(file))
        }
        const images=imageUrl.map((image:string)=>{
          return{
            image_url:image,
            product_id:newProduct.dataValues.id,
          }
        })
        await this.imageModel.bulkCreate(images,{transaction})
      }
      await transaction.commit()
        const findProduct=await this.model.findOne({
          where:{name:lower},
          include:{all:true}
        })
      return sucResponse('Product created successfully', findProduct);
    } catch (error) {
      await transaction.rollback()
      return catchError(error)
    }
  }

  async findAll() {
    try {
      const products = await this.model.findAll({ include: [Category] });
      return sucResponse('success', products);
    } catch (error) {
      return catchError(error);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.model.findByPk(id);
      if (!product) {
        throw new NotFoundException(`Product not found which that id ${id}`);
      }
      return sucResponse('success', product);
    } catch (error) {
      return catchError(error);
    }
  }

  // async update(id: number, updateProductDto: UpdateProductDto,file?:Express.Multer.File) {
  //   try {
  //     const productById = await this.model.findByPk(id);
  //     const image=await this.imageModel.findAll({where:{product_id:id}})
  //     if (file) {
  //       if (image && (await this.fileService.existFile(image))) {
  //         await this.fileService.deleteFile(image);
  //       }
  //       image = await this.fileService.createFile(file);
  //     }
  //     if (!productById) {
  //       throw new NotFoundException('Not found');
  //     }
  //     let { name } = updateProductDto;
  //     if (name) {
  //       name = String(name).toLowerCase();
  //     }
  //     const existProduct = await this.model.findOne({ where: { name } });
  //     if (existProduct) {
  //       throw new ConflictException('This product already exists');
  //     }
  //     const product = await this.model.update(
  //       { ...updateProductDto, name },
  //       { where: { id }, returning: true },
  //     );
  //     return sucResponse('success', product);
  //   } catch (error) {
  //     return catchError(error);
  //   }
  // }

  // async delete(id: number) {
  //   try {
  //     const product = await this.model.findByPk(id);
  //     if (!product) {
  //       throw new NotFoundException(`Product not found which that id ${id}`);
  //     }
  //     if (product?.dataValues.images && (await this.fileService.existFile(product.))) {
  //       await this.fileService.deleteFile();
  //     }
  //     await this.model.destroy({ where: { id } });
  //     return sucResponse('Product deleted', {});
  //   } catch (error) {
  //     return catchError(error);
  //   }
  // }
}
