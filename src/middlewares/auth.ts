import { Response, NextFunction } from 'express';

import { CustomRequest } from '../interfaces';
import { AuthService } from '../service';

export async function auth(req: CustomRequest, _: Response, next: NextFunction): Promise<unknown> {
    try {
        const token = req.headers['authorization'];
        const payload = await AuthService.decodeToken(token);

        req.user = payload;

        return next();
    } catch (err) {
        return next(err);
    }
}
