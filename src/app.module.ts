import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';
import config from './config';
import { Product } from './products/models/product.models';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/models/category.models';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: config.PG_HOST,
      port: config.PG_PORT,
      username: config.PG_USER,
      password: config.PG_PASS,
      database: config.PG_DB,
      synchronize: true,
      logging: false,
      autoLoadModels: true,
      models: [Product, Category],
    }),
    ProductsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
