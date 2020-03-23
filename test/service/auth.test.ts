import * as jwt from 'jsonwebtoken';

import { userFactory } from '../entity-factory';
import { AuthService } from '../../src/service';
import { User } from '../../src/entity';
import { UserRepository } from '../../src/repository';
import { Message } from '../../src/helper';
import { LoginResponse } from '../../src/interfaces';

describe('User service tests', () => {
    describe('login', () => {
        test('should throw error if user or password are incorrect', async () => {
            const user = userFactory.build() as User;

            const saveUserSpy = jest
                .spyOn(UserRepository, 'findOne')
                .mockResolvedValue(undefined);

            try {
                await AuthService.login(user);
                throw new Error('Login should have failed but it did\'t');
            } catch (err) {
                expect(err.message).toBe('Usuário e/ou senha incorretos');
                expect(err.status).toBe(400);
                expect(err).toBeInstanceOf(Message);
                expect(saveUserSpy).toHaveBeenCalled();
            }
        });

        test('should return authorization if user is valid', async () => {
            const user = userFactory.build() as User;

            const expectedResponse: LoginResponse = {
                username: user.username,
                accessToken: 'token',
                expiresIn: 3600000,
            };

            const saveUserSpy = jest
                .spyOn(UserRepository, 'findOne')
                .mockResolvedValue(user);

            const generateSpy = jest
                .spyOn(jwt, 'sign')
                .mockReturnValue('token' as never);

            const response = await AuthService.login(user);

            expect(response).toEqual(expectedResponse);
            expect(saveUserSpy).toHaveBeenCalled();
            expect(generateSpy).toHaveBeenCalled();
        });
    });

    describe('decodeToken', () => {
        test('should throw error if token is empty', async () => {
            try {
                await AuthService.decodeToken('');
                throw new Error('Create user should have failed but it did\'t');
            } catch (err) {
                expect(err.message).toBe('Token inválido');
                expect(err.status).toBe(400);
                expect(err).toBeInstanceOf(Message);
            }
        });

        test('should throw error if token does not contain bearer', async () => {
            try {
                await AuthService.decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
                throw new Error('Create user should have failed but it did\'t');
            } catch (err) {
                expect(err.message).toBe('Token inválido');
                expect(err.status).toBe(400);
                expect(err).toBeInstanceOf(Message);
            }
        });

        test('should throw error if user is not found', async () => {
            const user = userFactory.build() as User;

            const jwtSpy = jest
                .spyOn(jwt, 'verify')
                .mockReturnValue(user as never);

            const findSpy = jest
                .spyOn(UserRepository, 'findOne')
                .mockResolvedValue(undefined);

            try {
                await AuthService.decodeToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
                throw new Error('Create user should have failed but it did\'t');
            } catch (err) {
                expect(err.message).toBe('Unauthorized');
                expect(err.status).toBe(401);
                expect(err).toBeInstanceOf(Message);
                expect(jwtSpy).toHaveBeenCalled();
                expect(findSpy).toHaveBeenCalled();
            }
        });

        test('should return user if found if token is valid', async () => {
            const user = userFactory.build() as User;

            const jwtSpy = jest
                .spyOn(jwt, 'verify')
                .mockReturnValue(user as never);

            const findSpy = jest
                .spyOn(UserRepository, 'findOne')
                .mockResolvedValue(user);

            const result = await AuthService.decodeToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');

            expect(result).toBe(user);
            expect(jwtSpy).toHaveBeenCalled();
            expect(findSpy).toHaveBeenCalled();
        });
    });
});
