import { CustomerModel } from '../model';
import { Customer } from '../entity';

export class CustomerRepository {
    public static async getAll(): Promise<Customer[]> {
        return CustomerModel.find({});
    }

    public static async getById(id: string): Promise<Customer> {
        return CustomerModel.findById(id);
    }

    public static async create(customer: Customer): Promise<Customer> {
        return CustomerModel.create(customer);
    }

    public static async update(id: string, customer: Customer): Promise<Customer> {
        return CustomerModel.findByIdAndUpdate(id, customer);
    }

    public static async delete(id: string): Promise<Customer> {
        return CustomerModel.findByIdAndDelete({ id });
    }
}
