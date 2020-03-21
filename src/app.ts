import 'source-map-support/register';
import './configuration/connection';

import { server } from './helper';
import { customerRouter, favoriteProductRouter, loginRouter } from './controller';

server({
    port: 3000,
    publicRoutes: [
        { path: '/api/v1', module: loginRouter },
    ],
    privateRoutes: [
    ],
});
