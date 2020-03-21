import { User } from '../entity';
import { UserRepository } from '../repository';

export class UserService {
    public static async create(user: User): Promise<string> {
        const savedUser = await UserRepository.saveUser(user);
        return `Usuário ${savedUser.username} cadastrado com sucesso`;
    }
}
