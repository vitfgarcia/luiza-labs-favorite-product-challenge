import { Document } from 'mongoose';

export class Product extends Document {
    id: string;
    price: number;
    image: string;
    brand: string;
    title: string;
    reviewScore: number;
}
