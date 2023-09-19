import { Global, Module } from '@nestjs/common';
import { mongoDbProvider } from './connection/connection.mongo';
import { MongoConstants } from './connection/constant.mongo';
import { mongoDbModelsProvider } from './connection/modal.connection.mongo';

@Global()
@Module({
  imports: [],
  providers: [...mongoDbProvider, ...mongoDbModelsProvider],
  exports: [MongoConstants.MONGO_PROVIDER],
})
export class DatabaseModule {}
