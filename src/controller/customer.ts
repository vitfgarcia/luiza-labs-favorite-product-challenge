import {
    Router,
    NextFunction,
    Response,
} from 'express';

import { CustomRequest } from '../interfaces';

export const customerRouter = Router({ mergeParams: true });

customerRouter.get('/customer', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        return res.sendStatus(200);
    } catch (err) {
        return next(err);
    }
});

customerRouter.get('/customer/:id', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        return res.sendStatus(200);
    } catch (err) {
        return next(err);
    }
});

customerRouter.post('/customer', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        return res.sendStatus(200);
    } catch (err) {
        return next(err);
    }
});

customerRouter.put('/customer/:id', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        return res.sendStatus(200);
    } catch (err) {
        return next(err);
    }
});

customerRouter.delete('/customer/:id', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        return res.sendStatus(200);
    } catch (err) {
        return next(err);
    }
});
