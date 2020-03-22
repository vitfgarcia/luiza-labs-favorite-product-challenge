import { Schema, SchemaDefinition, model } from 'mongoose';
import * as uuid from 'uuid/v4';
import { User } from '../entity';

const definition: SchemaDefinition = {
    id: {
        type: String,
        default: uuid,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
};

export const UserSchema = new Schema<User>(definition);
export const UserModel = model<User>('User', UserSchema);
