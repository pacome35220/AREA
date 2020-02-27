import { Request, Response, NextFunction } from 'express';
import auth from 'basic-auth';
import User from './models/User';
import { ExtendedResponse } from './types/Response';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    const date = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
    const method = req.method.toUpperCase();
    const url = req.originalUrl;
    const ip = req.ip;

    console.log(`${date} - ${ip} - ${method} ${url}`);
    next();
};

export const saveRequestTimestamp = (
    req: Request,
    res: ExtendedResponse,
    next: NextFunction
) => {
    res.locals.timestamp = Date.now();
    next();
};

export const saveUserBasicAuthHeader = (
    req: Request,
    res: ExtendedResponse,
    next: NextFunction
) => {
    const credentials = auth(req);

    if (!credentials) {
        res.setHeader('WWW-Authenticate', 'Basic realm="AREA-server"');
        return res
            .status(401)
            .send('Missing Authorization header with Basic\n');
    }

    res.locals.credentials = credentials;
    next();
};

export const saveUserFromDatabase = async (
    req: Request,
    res: ExtendedResponse,
    next: NextFunction
) => {
    // Check if Authorization header (email:password) is valid.
    const { name, pass } = res.locals.credentials; // name is an email

    // Get user profile from database.
    const user = await User.findOne({
        include: [
            User.associations.genericAreas,
            User.associations.specificAreas
        ],
        where: { email: name }
    });

    if (!user || user.password !== pass) {
        return res
            .status(403)
            .send(
                'Email or password does not match, or the account with this email does not exist\n'
            );
    }

    res.locals.user = user;
    next();
};

export const handleServerErrorResponse = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);
    res.sendStatus(500);
};
