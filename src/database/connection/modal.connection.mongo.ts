import { Connection } from 'mongoose';
import { createProductModel } from '../schema/products.schema';
import { MongoConstants } from './constant.mongo';

export const mongoDbModelsProvider = [
	{
		provide: MongoConstants.PRODUCT_PROVIDER,
		useFactory: (connection: Connection) => { 
			createProductModel(connection) 
		},
		inject: [MongoConstants.MONGO_PROVIDER]
	},

];
