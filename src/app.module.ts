import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';
import config from './config';
import { Product } from './products/models/product.models';
import { CartModule } from './cart/cart.module';
import { OrderItemModule } from './order-item/order-item.module';
import { UserModule } from './user/user.module';
import { Order } from './order/models/order.model';
import { Review } from './review/models/review.entity';
import { User } from './user/model/user.model';
import { JwtModule } from '@nestjs/jwt';
import { Category } from './categories/models/category.models';
import { CategoriesModule } from './categories/categories.module';
import { OrderItem } from './order-item/models/order-item.models';
import { Cart } from './cart/models/cart.model';
import { ImagesOfProduct } from './products/models/image-of-product.model';
import { FileModule } from './file/file.module';
import { CacheModule } from '@nestjs/cache-manager';

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
      models: [
        Product,
        Order,
        Review,
        User,
        Category,
        OrderItem,
        Cart,
        ImagesOfProduct,
      ],
    }),
    JwtModule.register({
      global: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ProductsModule,
    CartModule,
    OrderItemModule,
    UserModule,
    CategoriesModule,
    FileModule,
  ],
})
export class AppModule {}
