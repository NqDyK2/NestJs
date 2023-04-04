import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { CategoryProduct } from '../schemas/product.schema';
import { User } from 'src/auth/schemas/user.schema';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNotEmpty()
    @IsString()
    readonly productName: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly price: number;
  
    @IsNotEmpty()
    @IsString()
    readonly shortDesc: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    @IsEnum(CategoryProduct, {message: 'Category product is not correct.'})
    readonly category: CategoryProduct;

    @IsEmpty()
    readonly user:User;
}
