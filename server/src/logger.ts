import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    const method = req.method.toUpperCase();
    const url = req.url;

    console.log(`${method} ${url}`);
    next();
};
