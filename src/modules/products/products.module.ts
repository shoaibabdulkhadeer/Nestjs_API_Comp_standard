import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongoConstants } from 'src/database/connection/constant.mongo';
import { createProductModel } from '../../database/schema/products.schema'; 
import { DatabaseModule } from 'src/database/database.module';
import { Connection } from 'mongoose';
import { ProductsDao } from 'src/database/dao/products.dao';

@Module({
  imports:[DatabaseModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsDao,
    
    {
      provide: MongoConstants.PRODUCT_PROVIDER,
      useFactory: (connection: Connection) => createProductModel(connection),
      inject: [MongoConstants.MONGO_PROVIDER], 
    },
  ],
})
export class ProductsModule {}
