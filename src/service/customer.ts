import { Customer } from '../entity';
import { CustomerRepository } from '../repository/customer';

export class CustomerService {
    public static async getAll(): Promise<Customer[]> {
        return CustomerRepository.getAll();
    }

    public static async getById(id: string): Promise<Customer> {
        return CustomerRepository.getById(id);
    }

    public static async create(customer: Customer): Promise<Customer> {
        return CustomerRepository.create(customer);
    }

    public static async update(id: string, customer: Customer): Promise<Customer> {
        return CustomerRepository.update(id, customer);
    }

    public static async delete(id: string): Promise<Customer> {
        return CustomerRepository.delete(id);
    }
}
