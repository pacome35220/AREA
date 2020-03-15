import { Response } from 'express';
import auth = require('basic-auth');
import User from '../models/User';

export interface ExtendedResponse extends Response {
    locals: {
        timestamp: number;
        credentials: auth.BasicAuthResult;
        user: User;
    };
}
