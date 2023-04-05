import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/schemas/user.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: mongoose.Model<Product>
  ) { }

  async create(product: Product, user: User): Promise<Product> {
    const data = Object.assign(product, { user: user._id });

    const res = await this.productModel.create(data)
    return res;
  }

  async findAll(query: Query): Promise<Product[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword 
    ? {
      productName: {
        $regex: query.keyword,
      },
    } : {}

    const products = await this.productModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return products;
  }

  async findById(id: string) {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.')
    }

    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found.')
    }

    return product
  }


  async updateById(id: string, product: Product): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, product, { new: true, runValidators: true })
  }

  async deleteById(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id)
  }
}
