import {
    Router,
    Request,
} from 'express';
import { User } from './entity';
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

export interface LoginResponse {
    username: string;
    accessToken: string;
    expiresIn: number;
}

export interface CustomRequest extends Request {
    user?: User;
    err?: Error | Message;
}
