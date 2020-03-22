import 'source-map-support/register';
import './configuration/connection';


import { server } from './helper';
import { customerRouter, authRouter } from './controller';

server({
    port: 3000,
    publicRoutes: [
        { path: '/', module: authRouter },
    ],
    privateRoutes: [
        { path: '/', module: customerRouter },
    ],
});
