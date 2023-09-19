//swagger

import { Controller, Get, Post, Body, Res, Patch, Param, Put, HttpStatus, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/database/Dto/productsDto';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'src/shared/appMessages.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    
    constructor(private readonly productservice:ProductsService) {}

    @Get()
    async getAllProducts(@Res() res:any) {
        try {
            const products = await this.productservice.getProductsSvc();
            return res.status(HttpStatus.OK)
            .send(products );
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).send(ERROR_MESSAGES.NOT_FOUND);

        }
    }

    @Get(':id')
    async getProductById(@Param('id') id: string, @Res() res:any) {
        try {
            const product = await this.productservice.getProductByidSvc(id);
            return res.status(HttpStatus.OK).send(product);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }
    
  
    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto, @Res() res:any) {
        try { 
            const newProduct = await this.productservice.PostProductsSvc(createProductDto);
            return res.status(HttpStatus.CREATED).send({newProduct});
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGES.CREATING_ERROR);
        }
    }

    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: CreateProductDto, @Res() res:any) {
        try {
            const updatedProduct = await this.productservice.updateProduct(id, updateProductDto);
            return res.status(HttpStatus.OK).send(updatedProduct);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }
        
    }

    @Patch('stock/:id')
    async updateStock(@Param('id') id: string, @Res() res:any) {
        try {
            const updatedStock = await this.productservice.updateStockSvc(id);
            return res.status(HttpStatus.OK).send(updatedStock);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }
}
