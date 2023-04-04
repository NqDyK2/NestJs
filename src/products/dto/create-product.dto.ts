import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';
import { Category } from 'src/book/schemas/book.schema';
import { CategoryProduct } from '../schemas/product.schema';

export class CreateProductDto {
    @IsNotEmpty({message: "Please enter product name!!"})
    @IsString()
    readonly productName: string;

    @IsNotEmpty({message: "Please enter product name!!"})
    @IsNumber()
    @Min(1)
    readonly price: number;

    @IsNotEmpty({message: "Product needs a short description!!"})
    @IsString()
    readonly shortDesc: string;

    @IsNotEmpty({message: "Product needs a description!!"})
    readonly description: string; 
    
    @IsNotEmpty()
    @IsEnum(CategoryProduct, {message: 'Category product is not correct.'})
    readonly category: CategoryProduct;

    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User;
}
