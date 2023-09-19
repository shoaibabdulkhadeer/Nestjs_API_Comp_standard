import { Connection, createConnection } from 'mongoose';
import { MongoConstants } from './constant.mongo';

const mongoDbProvider = [
  {
    provide: MongoConstants.MONGO_PROVIDER,
    useFactory: () => {
      const connString = process.env.MONGO_URL;
      const conn: Connection = createConnection(connString);
      conn.on('connected', () => {
        console.log('Database Connected');
      });
      conn.on('error', () => {
        console.log('Error While Connecting DB');
      });
      return conn; 
    },
    inject: [],
  },
];

export { mongoDbProvider };
