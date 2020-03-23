import axios from 'axios';

import { Product } from '../entity';
import { Message } from '../helper';

export class ProductService {
    public static async getById(id: string): Promise<Product> {
        try {
            const baseUrl = process.env.PRODUCT_API_URL;
            const response = await axios.get(`${baseUrl}/${id}`);
            return response.data;
        } catch (err) {
            if (err.status === 404) {
                throw new Message('Produto não encontrado').withStatus(err.status);
            }

            throw err;
        }
    }
}
