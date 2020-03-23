import { CustomerModel } from '../model';
import { Customer } from '../entity';

export class CustomerRepository {
    public static async getAll(): Promise<Customer[]> {
        return CustomerModel
            .find({}, '-_id');
    }

    public static async getById(id: string): Promise<Customer> {
        return CustomerModel.findOne({ id }, '-_id');
    }

    public static async create(customer: Customer): Promise<Customer> {
        return CustomerModel.create(customer);
    }

    public static async update(id: string, customer: Customer): Promise<Customer> {
        return CustomerModel.findOneAndUpdate({ id }, customer);
    }

    public static async delete(id: string): Promise<Customer> {
        return CustomerModel.findOneAndDelete({ id });
    }
}
