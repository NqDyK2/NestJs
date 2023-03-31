import { Prop, Schema } from "@nestjs/mongoose";

export enum CategoryProduct {
    TSHIRT = 'T-Shirt',
    SHORT = 'Shorts',
    JACKET = 'Jacket',
    SWEATER = 'Sweater',
    HOODIES = 'HOODIES',
    JEANS = 'Jeans'
}

@Schema({
    timestamps: true,
})

export class Product {
    @Prop()
    title: string;

    @Prop()
    price: number;
    
    @Prop()
    shortDesc: string;

    @Prop()
    description: string;
    
}
