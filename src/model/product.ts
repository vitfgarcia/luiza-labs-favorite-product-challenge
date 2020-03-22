import { Schema, SchemaDefinition } from 'mongoose';

const definition: SchemaDefinition = {
    id: {
        type: String,
        unique: true,
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

export const ProductSchema = new Schema(definition, { _id: false });
