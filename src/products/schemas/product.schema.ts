import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";

export enum CategoryProduct {
    TSHIRT = 'T-Shirt',
    SHORT = 'Shorts',
    JACKET = 'Jacket',
    SWEATER = 'Sweater',
    HOODIES = 'Hoodies',
    JEANS = 'Jeans'
}

@Schema({
    timestamps: true,
})

export class Product {
    @Prop()
    productName: string;

    @Prop()
    price: number;

    @Prop()
    shortDesc: string;

    @Prop()
    description: string;

    @Prop()
    category: CategoryProduct;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);