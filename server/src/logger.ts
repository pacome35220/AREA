import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    const date = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
    const method = req.method.toUpperCase();
    const url = req.url;

    console.log(`${date} - ${method} ${url}`);
    next();
};
