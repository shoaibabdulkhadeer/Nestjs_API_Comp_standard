import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  app.useGlobalPipes(new ValidationPipe());

   
  const options = new DocumentBuilder()
  .setTitle('SHOAIB NEST JS ASSIGNMENT')
  .setDescription('API Documentation')
  .setVersion('1.0')
  .addTag('products') // Add a tag for your ProductsController
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);




  await app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  );


 

}
bootstrap();
