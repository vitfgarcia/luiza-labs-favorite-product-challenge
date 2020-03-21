import { Document } from 'mongoose';

export class User extends Document {
    id: string;
    username: string;
    password: string;
}
