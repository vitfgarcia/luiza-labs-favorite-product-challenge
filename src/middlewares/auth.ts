import { Response, NextFunction } from 'express';

import { CustomRequest } from '../interfaces';
import { LoginService } from '../service/login';

export async function auth(req: CustomRequest, _: Response, next: NextFunction): Promise<unknown> {
    try {
        const token = req.headers['authorization'];
        const payload = await LoginService.decodeToken(token);

        req.user = payload;

        return next();
    } catch (err) {
        return next(err);
    }
}
