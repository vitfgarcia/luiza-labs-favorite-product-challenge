import { Schema, SchemaDefinition, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { ProductSchema } from '.';
import { Customer } from '../entity';

const definition: SchemaDefinition = {
    id: {
        type: String,
        default: uuid,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    favoriteProducts: {
        type: [ProductSchema],
        default: [],
    },
};

export const CustomerSchema = new Schema(definition, { versionKey: false });
export const CustomerModel = model<Customer>('Customer', CustomerSchema);
