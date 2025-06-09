import { Product } from './models/product.models';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileService } from 'src/file/file.service';
import { ImagesOfProduct } from './models/image-of-product.model';

@Module({
  imports: [SequelizeModule.forFeature([Product,ImagesOfProduct])],
  controllers: [ProductsController],
  providers: [ProductsService, AuthGuard,FileService],
})
export class ProductsModule {}
