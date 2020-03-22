import { Schema, SchemaDefinition, model } from 'mongoose';
import * as uuid from 'uuid/v4';

import { ProductSchema } from '.';
import { Customer } from '../entity';

const definition: SchemaDefinition = {
    id: {
        type: String,
        default: uuid,
        unique: true,
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
    },
};

export const CustomerSchema = new Schema(definition);
export const CustomerModel = model<Customer>('Customer', CustomerSchema);
