import {
    Router,
    NextFunction,
    Response,
} from 'express';

import { CustomRequest } from '../interfaces';

export const favoriteProductRouter = Router({ mergeParams: true });

favoriteProductRouter.put('/customer/:id/product/:productId', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        return res.sendStatus(200);
    } catch (err) {
        return next(err);
    }
});

favoriteProductRouter.delete('/customer/:id/product/:productId', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        return res.sendStatus(200);
    } catch (err) {
        return next(err);
    }
});
