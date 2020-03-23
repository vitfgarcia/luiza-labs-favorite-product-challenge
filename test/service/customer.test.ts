import { v4 as uuid } from 'uuid';

import { customerFactory, productFactory } from '../entity-factory';
import { CustomerService, ProductService } from '../../src/service';
import { Customer, Product } from '../../src/entity';
import { CustomerRepository } from '../../src/repository';
import { Message } from '../../src/helper';

describe('Customer service tests', () => {
    describe('getAll', () => {
        test('should return a customer list', async () => {
            const customers = customerFactory.buildList(2) as Customer[];

            const repoSpy = jest
                .spyOn(CustomerRepository, 'getAll')
                .mockResolvedValue(customers);

            const list = await CustomerService.getAll();

            expect(list).toBe(customers);
            expect(repoSpy).toHaveBeenCalled();
        });
    });

    describe('getById', () => {
        test('should return a customer list', async () => {
            const customer = customerFactory.build() as Customer;

            const repoSpy = jest
                .spyOn(CustomerRepository, 'getById')
                .mockResolvedValue(customer);

            const result = await CustomerService.getById(customer.id);

            expect(result).toBe(customer);
            expect(repoSpy).toHaveBeenCalled();
        });

        test('should throw error if customer is not found', async () => {
            const id = uuid();

            const repoSpy = jest
                .spyOn(CustomerRepository, 'getById')
                .mockResolvedValue(undefined);

            try {
                await CustomerService.getById(id);
                throw new Error('Expected getById to have thrown and error but it didn\'t');
            } catch (err) {
                expect(err.message).toBe('Usuário não encontrado');
                expect(err.status).toBe(404);
                expect(err).toBeInstanceOf(Message);
                expect(repoSpy).toHaveBeenCalled();
            }
        });
    });

    describe('create', () => {
        test('should return created customer', async () => {
            const customer = customerFactory.build() as Customer;

            const saveSpy = jest
                .spyOn(CustomerRepository, 'create')
                .mockResolvedValue(customer);

            const result = await CustomerService.create(customer);

            expect(saveSpy).toHaveBeenCalled();
            expect(result).toBe(customer);
        });

        test('should throw error if email already exists', async () => {
            const customer = customerFactory.build() as Customer;

            const saveSpy = jest
                .spyOn(CustomerRepository, 'create')
                .mockImplementation(async () => {
                    throw new Error('duplicate key');
                });

            try {
                await CustomerService.create(customer);
                throw new Error('Create user should have failed but it did\'t');
            } catch (err) {
                expect(err.message).toBe('Este email jé foi utilizado, tente outro');
                expect(err.status).toBe(400);
                expect(err).toBeInstanceOf(Message);
                expect(saveSpy).toHaveBeenCalled();
            }
        });
    });

    describe('update', () => {
        test('should return updated user', async () => {
            const customer = customerFactory.build() as Customer;

            const updateSpy = jest
                .spyOn(CustomerRepository, 'update')
                .mockResolvedValue(customer);

            const searchSpy = jest
                .spyOn(CustomerRepository, 'getById')
                .mockResolvedValue(customer);

            const result = await CustomerService.update(customer.id, customer);

            expect(updateSpy).toHaveBeenCalled();
            expect(searchSpy).toHaveBeenCalled();
            expect(result).toBe(customer);
        });

        test('should throw error if user is not found', async () => {
            const customer = customerFactory.build() as Customer;

            const updateSpy = jest
                .spyOn(CustomerRepository, 'update')
                .mockResolvedValue(undefined);

            const searchSpy = jest
                .spyOn(CustomerRepository, 'getById')
                .mockResolvedValue(undefined);

            try {
                await CustomerService.update(customer.id, customer);
                throw new Error('Expected update to throw error but it didn\'t');
            } catch (err) {
                expect(err.message).toBe('Usuário não encontrado');
                expect(err.status).toBe(404);
                expect(err).toBeInstanceOf(Message);
                expect(updateSpy).toHaveBeenCalled();
                expect(searchSpy).not.toHaveBeenCalled();
            }
        });
    });

    describe('delete', () => {
        test('should return deleted user', async () => {
            const customer = customerFactory.build() as Customer;

            const deleteSpy = jest
                .spyOn(CustomerRepository, 'delete')
                .mockResolvedValue(customer);

            const result = await CustomerService.delete(customer.id);

            expect(deleteSpy).toHaveBeenCalled();
            expect(result).toBe(customer);
        });

        test('should throw error if user is not found', async () => {
            const customer = customerFactory.build() as Customer;

            const deleteSpy = jest
                .spyOn(CustomerRepository, 'delete')
                .mockResolvedValue(undefined);

            try {
                await CustomerService.delete(customer.id);
                throw new Error('Expected update to throw error but it didn\'t');
            } catch (err) {
                expect(err.message).toBe('Usuário não encontrado');
                expect(err.status).toBe(404);
                expect(err).toBeInstanceOf(Message);
                expect(deleteSpy).toHaveBeenCalled();
            }
        });
    });

    describe('addFavoriteProduct', () => {
        test('should return error if customer is not found', async () => {
            const customer = customerFactory.build() as Customer;
            const product = productFactory.build() as Product;

            const getSpy = jest
                .spyOn(CustomerRepository, 'getById')
                .mockResolvedValue(undefined);

            try {
                await CustomerService.addFavoriteProduct(customer.id, product.id);
                throw new Error('Expected addFavoriteProduct to throw error but it didn\'t');
            } catch (err) {
                expect(err.message).toBe('Cliente não encontrado');
                expect(err.status).toBe(404);
                expect(err).toBeInstanceOf(Message);
                expect(getSpy).toHaveBeenCalled();
            }
        });

        test('should return error if product is already on the favorite product list', async () => {
            const product = productFactory.build() as Product;
            const customer = customerFactory.build({ favoriteProducts: [product] }) as Customer;

            const getSpy = jest
                .spyOn(CustomerRepository, 'getById')
                .mockResolvedValue(customer);

            try {
                await CustomerService.addFavoriteProduct(customer.id, product.id);
                throw new Error('Expected addFavoriteProduct to throw error but it didn\'t');
            } catch (err) {
                expect(err.message).toBe('Cliente já adicionou o produto a lista de produtos favoritos');
                expect(err.status).toBe(400);
                expect(err).toBeInstanceOf(Message);
                expect(getSpy).toHaveBeenCalled();
            }
        });

        test('should return customer with added product to favorite list', async () => {
            const products = productFactory.buildList(1) as Product[];
            const customer = customerFactory.build({ favoriteProducts: products }) as Customer; // empty array is passed due to mongo default on model
            const product = productFactory.build() as Product;
            const expectedCustomer = customerFactory.build({ ...customer, favoriteProducts: [...products, product] }) as Customer;

            const getSpy = jest
                .spyOn(CustomerRepository, 'getById')
                .mockResolvedValue(customer);

            const productSpy = jest
                .spyOn(ProductService, 'getById')
                .mockResolvedValue(product);

            const updateSpy = jest
                .spyOn(CustomerRepository, 'update')
                .mockResolvedValue(expectedCustomer);

            const result = await CustomerService.addFavoriteProduct(customer.id, product.id);
            expect(result).toEqual(expectedCustomer);
            expect(getSpy).toHaveBeenCalled();
            expect(productSpy).toHaveBeenCalled();
            expect(updateSpy).toHaveBeenCalled();
        });
    });

    describe('removeFavoriteProduct', () => {
        test('should return error if customer is not found', async () => {
            const customer = customerFactory.build() as Customer;
            const product = productFactory.build() as Product;

            const getSpy = jest
                .spyOn(CustomerRepository, 'getById')
                .mockResolvedValue(undefined);

            try {
                await CustomerService.removeFavoriteProduct(customer.id, product.id);
                throw new Error('Expected removeFavoriteProduct to throw error but it didn\'t');
            } catch (err) {
                expect(err.message).toBe('Cliente não encontrado');
                expect(err.status).toBe(404);
                expect(err).toBeInstanceOf(Message);
                expect(getSpy).toHaveBeenCalled();
            }
        });

        test('should return error if product is not on the favorite product list', async () => {
            const products = productFactory.buildList(2) as Product[];

            const customer = customerFactory.build({ favoriteProducts: products }) as Customer; // empty array is passed due to mongo default on model
            const product = productFactory.build() as Product;

            const getSpy = jest
                .spyOn(CustomerRepository, 'getById')
                .mockResolvedValue(customer);

            try {
                await CustomerService.removeFavoriteProduct(customer.id, product.id);
                throw new Error('Expected removeFavoriteProduct to throw error but it didn\'t');
            } catch (err) {
                expect(err.message).toBe('Item não está na lista do cliente');
                expect(err.status).toBe(400);
                expect(err).toBeInstanceOf(Message);
                expect(getSpy).toHaveBeenCalled();
            }
        });

        test('should return customer with added product to favorite list', async () => {
            const products = productFactory.buildList(2) as Product[];
            const customer = customerFactory.build({ favoriteProducts: products }) as Customer;
            const expectedCustomer = customerFactory.build({ ...customer, favoriteProducts: [products[1]] }) as Customer;

            const getSpy = jest
                .spyOn(CustomerRepository, 'getById')
                .mockResolvedValue(customer);

            const updateSpy = jest
                .spyOn(CustomerRepository, 'update')
                .mockResolvedValue(expectedCustomer);

            const result = await CustomerService.removeFavoriteProduct(customer.id, products[0].id);
            expect(result).toEqual(expectedCustomer);
            expect(getSpy).toHaveBeenCalled();
            expect(updateSpy).toHaveBeenCalled();
        });
    });
});
