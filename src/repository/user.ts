import { User } from '../entity';
import { UserModel } from '../model';

export class UserRepository {
    public static async saveUser(user: User): Promise<User> {
        return UserModel.create(user);
    }

    public static async findOne(user: Partial<User>): Promise<User> {
        return UserModel.findOne(user);
    }
}
