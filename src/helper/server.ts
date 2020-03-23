import * as express from 'express';
import * as bodyParse from 'body-parser';
import * as health from 'express-healthcheck';

import { ServerConfig } from '../interfaces';
import {
    logger,
    errorHandler,
    notFound,
    auth,
} from '../middlewares';

export function server(config: ServerConfig): void {
    const { port, publicRoutes, privateRoutes } = config;

    const app = express();

    // Express configuration
    app.use('/health', health());
    app.use(bodyParse.json());
    app.use(logger);

    // Registering Public Routes
    publicRoutes.forEach((route) => {
        app.use(route.path, route.module);
    });

    // Authentication Middleware
    app.use(auth);

    // Registering Private Routes
    privateRoutes.forEach((route) => {
        app.use(route.path, route.module);
    });

    // Error Handlers
    app.use(notFound);
    app.use(errorHandler);


    app.listen(port);
    console.info(`Starting server on port ${port}`);
}
