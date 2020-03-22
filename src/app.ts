import 'source-map-support/register';
import './configuration/connection';


import { server } from './helper';
import { customerRouter, favoriteProductRouter, loginRouter } from './controller';

server({
    port: 3000,
    publicRoutes: [
        { path: '/', module: loginRouter },

    ],
    privateRoutes: [
        { path: '/', module: customerRouter },
        { path: '/', module: favoriteProductRouter },
    ],
});
