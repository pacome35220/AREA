import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/about.json', (req: Request, res: Response) => {
    res.json({
        client: req.connection.remoteAddress,
        server: {
            current_time: Math.round(Date.now() / 1000),
            services: []
        }
    });
});

export default router;
