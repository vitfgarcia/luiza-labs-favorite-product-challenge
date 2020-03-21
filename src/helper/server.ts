import * as health from 'express-healthcheck';
import * as express from 'express';
import * as bodyParse from 'body-parser';

import { ServerConfig } from '../interfaces';
import { logger, errorHandler, notFound, auth } from '../middlewares';

export function server(config: ServerConfig): void {
    const { port, publicRoutes, privateRoutes } = config;

    const app = express();

    app.use('/health', health());
    app.use(bodyParse.json());

    app.use(logger);

    publicRoutes.forEach((route) => {
        app.use(route.path, route.module);
    });

    app.use(auth);

    privateRoutes.forEach((route) => {
        app.use(route.path, route.module);
    });

    app.use(notFound);
    app.use(errorHandler);

    // TODO: remove disable
    // eslint-disable-next-line no-console
    console.info(`Starting server on port ${port}`);
    app.listen(port);
}
