import { Product } from './models/product.models';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, AuthGuard],
})
export class ProductsModule {}
