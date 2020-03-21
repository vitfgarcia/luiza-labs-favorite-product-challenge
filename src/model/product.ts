import { Schema, SchemaDefinition, model } from 'mongoose';
import { Product } from '../entity';

const definition: SchemaDefinition = {
    id: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    brand: {
        type: String,
    },
    title: {
        type: String,
    },
    reviewScore: {
        type: Number,
    },
};

export const ProductSchema = new Schema(definition);
export const ProductModel = model<Product>('Product', ProductSchema);
