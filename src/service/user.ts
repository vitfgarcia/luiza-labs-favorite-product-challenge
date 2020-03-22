import { User } from '../entity';
import { UserRepository } from '../repository';
import { Message } from '../helper';

export class UserService {
    public static async create(user: User): Promise<string> {
        try {
            const savedUser = await UserRepository.saveUser(user);
            return `Usuário ${savedUser.username} cadastrado com sucesso`;
        } catch (err) {
            const duplicateUser = err.message.includes('duplicate key');

            if (duplicateUser) {
                throw new Message('Nome de usuário ja utilizado, tente outro');
            }

            throw err;
        }
    }
}
