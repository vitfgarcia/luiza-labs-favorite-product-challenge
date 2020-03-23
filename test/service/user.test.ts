import { userFactory } from '../entity-factory';
import { UserService } from '../../src/service';
import { User } from '../../src/entity';
import { UserRepository } from '../../src/repository';
import { Message } from '../../src/helper';

describe('User service tests', () => {
    describe('create', () => {
        test('should return created user message', async () => {
            const user = userFactory.build() as User;
            const expectedMessage = `Usuário ${user.username} cadastrado com sucesso`;

            const saveUserSpy = jest
                .spyOn(UserRepository, 'saveUser')
                .mockResolvedValue(user);

            const result = await UserService.create(user);

            expect(saveUserSpy).toHaveBeenCalled();
            expect(result).toBe(expectedMessage);
        });

        test('should throw error if username already exists', async () => {
            const user = userFactory.build() as User;

            const saveUserSpy = jest
                .spyOn(UserRepository, 'saveUser')
                .mockImplementation(async () => {
                    throw new Error('duplicate key');
                });

            try {
                await UserService.create(user);
                throw new Error('Create user should have failed but it did\'t');
            } catch (err) {
                expect(err.message).toBe('Nome de usuário ja utilizado, tente outro');
                expect(err.status).toBe(400);
                expect(err).toBeInstanceOf(Message);
                expect(saveUserSpy).toHaveBeenCalled();
            }
        });
    });
});
