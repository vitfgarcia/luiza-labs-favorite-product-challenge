import {
    Router,
    Request,
} from 'express';
import { Message } from './helper';

export interface ServerConfig {
    port: number;
    publicRoutes: RouteConfig[];
    privateRoutes: RouteConfig[];
}

export interface RouteConfig {
    path: string;
    module: Router;
}

export interface CustomRequest extends Request {
    err?: Error | Message;
}
