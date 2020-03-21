import { Response, NextFunction } from 'express';

import { CustomRequest } from '../interfaces';
import { LoginService } from '../service/login';

export async function auth(req: CustomRequest, _: Response, next: NextFunction): Promise<unknown> {
        return next();
}
