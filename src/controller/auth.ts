import {
    Router,
    NextFunction,
    Response,
    Request,
} from 'express';

import { UserService, AuthService } from '../service';

export const authRouter = Router({ mergeParams: true });

authRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const message = await UserService.create(req.body);
        return res.status(201).json({ message });
    } catch (err) {
        return next(err);
    }
});

authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await AuthService.login(req.body);
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});

authRouter.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];
        const response = await AuthService.refreshToken(token);
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});
