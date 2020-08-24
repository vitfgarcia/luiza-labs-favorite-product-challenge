import { Customer } from '../entity';
import { CustomerRepository } from '../repository';
import { Message } from '../helper';
import { ProductService } from '.';

export class CustomerService {
    public static async getAll(): Promise<Customer[]> {
        return CustomerRepository.getAll();
    }

    public static async getById(id: string): Promise<Customer> {
        const customer = await CustomerRepository.getById(id);

        if (!customer) {
            throw new Message('Cliente não encontrado').withStatus(404);
        }

        return customer;
    }

    public static async create(customer: Customer): Promise<Customer> {
        try {
            return await CustomerRepository.create(customer);
        } catch (err) {
            const duplicateUser = err.message.includes('duplicate key');

            if (duplicateUser) {
                throw new Message('Este email jé foi utilizado, tente outro').withStatus(400);
            }

            throw err;
        }
    }

    public static async update(id: string, customer: Customer): Promise<Customer> {
        const updated = await CustomerRepository.update(id, customer);

        if (!updated) {
            throw new Message('Cliente não encontrado').withStatus(404);
        }

        return CustomerRepository.getById(updated.id);
    }

    public static async delete(id: string): Promise<Customer> {
        const deleted = await CustomerRepository.delete(id);

        if (!deleted) {
            throw new Message('Cliente não encontrado').withStatus(404);
        }

        return deleted;
    }

    public static async addFavoriteProduct(id: string, productId: string): Promise<Customer> {
        const customer = await CustomerRepository.getById(id);

        if (!customer) {
            throw new Message('Cliente não encontrado').withStatus(404);
        }

        const hasProduct = customer.favoriteProducts
            .some((product) => product.id === productId);

        if (hasProduct) {
            throw new Message('Cliente já adicionou o produto a lista de produtos favoritos').withStatus(400);
        }

        const product = await ProductService.getById(productId);

        customer.favoriteProducts.push(product);

        return CustomerService.update(id, customer);
    }

    public static async removeFavoriteProduct(id: string, productId: string): Promise<Customer> {
        const customer = await CustomerRepository.getById(id);

        if (!customer) {
            throw new Message('Cliente não encontrado').withStatus(404);
        }

        const hasProduct = customer.favoriteProducts
            .find((product) => product.id === productId);

        if (!hasProduct) {
            throw new Message('Item não está na lista do cliente').withStatus(400);
        }

        customer.favoriteProducts = customer.favoriteProducts.filter((product) => product.id !== productId);

        return CustomerService.update(id, customer);
    }
}
