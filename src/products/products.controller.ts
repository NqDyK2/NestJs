import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Product } from './schemas/product.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() product: CreateProductDto, @Req() req): Promise<Product> {
    return this.productsService.create(product, req.user);
  }

  @Get()
  async getAllProducts(@Query() query: ExpressQuery):Promise<Product[]> {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(id);
  }

  @Put(':id')
  async updateProductPut(@Param('id') id: string, @Body() product: UpdateProductDto): Promise<Product> {
    return this.productsService.updateById(id, product);
  }

  @Patch(':id')
  async updateProductPatch(@Param('id') id: string, @Body() product: UpdateProductDto): Promise<Product> {
    return this.productsService.updateById(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.deleteById(id)
  }
}
