import { Document } from 'mongoose';
import { Product } from '.';

export class Customer extends Document {
    id: string;
    name: string;
    email: string;
    favoriteProducts: Product[];
}
