import { Schema, SchemaDefinition, model } from 'mongoose';
import * as uuid from 'uuid/v4';

import { ProductSchema } from '.';
import { Customer } from '../entity';

const definition: SchemaDefinition = {
    _id: {
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
