import * as jwt from 'jsonwebtoken';
import { secret } from '../configuration/jwt';

import { UserRepository } from '../repository';
import { User } from '../entity';

import { LoginResponse } from '../interfaces';

import { Message } from '../helper';

export class LoginService {
    private static expiresIn = 3600000;

    public static async login(user: User): Promise<LoginResponse> {
        const foundUser = await UserRepository.findOne(user);

        if (!foundUser) {
            throw new Message('Usuário não encontrado').withStatus(404);
        }


        const accessToken = LoginService.generateToken(foundUser, LoginService.expiresIn);

        return {
            username: user.username,
            accessToken,
            expiresIn: LoginService.expiresIn,
        };
    }

    public static async refreshToken(token: string): Promise<LoginResponse> {
        const user = await this.decodeToken(token);
        const newAccessToken = LoginService.generateToken(user, LoginService.expiresIn);

        return {
            username: user.username,
            accessToken: newAccessToken,
            expiresIn: LoginService.expiresIn,
        };
    }


    public static async decodeToken(token: string): Promise<User> {
        if (!token) {
            throw new Message('Unauthorized').withStatus(401);
        }

        const payload: Partial<User> = jwt.verify(token, secret);

        if (!payload) {
            throw new Message('Unauthorized').withStatus(401);
        }

        const user = await UserRepository.findOne(payload);

        if (!user) {
            throw new Message('Unauthorized').withStatus(401);
        }

        return user;
    }

    private static generateToken(user: User, expiresIn): string {
        const tokenPayload: Partial<User> = {
            username: user.username,
            id: user.id,
        };

        const tokenOptions: jwt.SignOptions = {
            expiresIn,
        };

        return jwt.sign(tokenPayload, secret, tokenOptions);
    }
}
