import axios from 'axios';
import { productFactory } from '../entity-factory';
import { ProductService } from '../../src/service';
import { Product } from '../../src/entity';
import { Message } from '../../src/helper';

describe('Product service tests', () => {
    describe('getById', () => {
        test('should return product if found', async () => {
            const product = productFactory.build() as Product;

            const axiosSpy = jest
                .spyOn(axios, 'get')
                .mockResolvedValue({ data: product, status: 200 });

            const result = await ProductService.getById(product.id);

            expect(axiosSpy).toHaveBeenCalled();
            expect(result).toBe(product);
        });

        test('should throw error message if product is not foind', async () => {
            const product = productFactory.build() as Product;

            const axiosSpy = jest
                .spyOn(axios, 'get')
                .mockRejectedValue({ data: 'product not found', status: 404 });

            try {
                await ProductService.getById(product.id);
                throw new Error('getById should have thrown and error but it didn\'t');
            } catch (err) {
                expect(err.message).toBe('Produto não encontrado');
                expect(err.status).toBe(404);
                expect(err).toBeInstanceOf(Message);
                expect(axiosSpy).toHaveBeenCalled();
            }
        });

        test('should throw error message if product is not foind', async () => {
            const product = productFactory.build() as Product;

            const axiosSpy = jest
                .spyOn(axios, 'get')
                .mockRejectedValue({ data: 'product not found', status: 404 });

            try {
                await ProductService.getById(product.id);
                throw new Error('getById should have thrown and error but it didn\'t');
            } catch (err) {
                expect(err.message).toBe('Produto não encontrado');
                expect(err.status).toBe(404);
                expect(err).toBeInstanceOf(Message);
                expect(axiosSpy).toHaveBeenCalled();
            }
        });

        test('should throw error message if product is not foind', async () => {
            const product = productFactory.build() as Product;

            const axiosSpy = jest
                .spyOn(axios, 'get')
                .mockImplementation(() => {
                    throw new Error('Erro inesperado');
                });

            try {
                await ProductService.getById(product.id);
                throw new Error('getById should have thrown and error but it didn\'t');
            } catch (err) {
                expect(err.message).toBe('Erro inesperado');
                expect(err).toBeInstanceOf(Error);
                expect(axiosSpy).toHaveBeenCalled();
            }
        });
    });
});
