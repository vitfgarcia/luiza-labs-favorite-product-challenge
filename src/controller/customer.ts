import {
    Router,
    NextFunction,
    Response,
} from 'express';

import { CustomRequest } from '../interfaces';
import { CustomerService } from '../service';

export const customerRouter = Router({ mergeParams: true });

customerRouter.get('/customer', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const response = await CustomerService.getAll();
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});

customerRouter.get('/customer/:id', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const response = await CustomerService.getById(req.params.id);
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});

customerRouter.post('/customer', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const response = await CustomerService.create(req.body);
        return res.status(201).json(response);
    } catch (err) {
        return next(err);
    }
});

customerRouter.put('/customer/:id', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const response = await CustomerService.update(req.params.id, req.body);
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});

customerRouter.delete('/customer/:id', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        await CustomerService.delete(req.params.id);
        return res.sendStatus(204);
    } catch (err) {
        return next(err);
    }
});

customerRouter.put('/customer/:id/product/:productId', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { id, productId } = req.params;
        const response = await CustomerService.addFavoriteProduct(id, productId);
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});

customerRouter.delete('/customer/:id/product/:productId', async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { id, productId } = req.params;
        const response = await CustomerService.removeFavoriteProduct(id, productId);
        return res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});
