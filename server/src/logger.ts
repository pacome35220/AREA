import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    const date = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
    const method = req.method.toUpperCase();
    const url = req.originalUrl;
    const ip = req.ip;

    console.log(`${date} - ${ip} - ${method} ${url}`);
    next();
};
