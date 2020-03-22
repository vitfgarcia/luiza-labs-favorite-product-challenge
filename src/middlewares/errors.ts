import { Request, Response, NextFunction } from 'express';
import { Message } from '../helper';
import { CustomRequest } from '../interfaces';

export function notFound(_: Request, res: Response): Response {
    return res.status(404).json('Nenhuma rota encontrada');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Message | Error, req: CustomRequest, res: Response, _: NextFunction): Response => {
    req.err = err;

    const response = {
        message: err.message,
    };

    if (err instanceof Message) {
        return res.status(err.status).send(response);
    }

    const isProduction = process.env.ENVIRONMENT === 'production';
    const errorResponse = isProduction ? 'Erro Inesperado' : response;

    return res.status(500).send(errorResponse);
};
