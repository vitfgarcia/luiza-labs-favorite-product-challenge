import * as morgan from 'morgan';

morgan.token('request-id', (req) => req.id);
morgan.token('error-message', (req) => req.err?.message);

const loggerFormat = {
    method: ':method',
    url: ':url',
    status: ':status',
    'response-time': ':response-time ms',
    'request-id': ':request-id',
    'error-message': ':error-message',
};

export const logger = morgan(JSON.stringify(loggerFormat));
