import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';

import logger from './logger';

import about from './routes/about';
import user from './routes/user';

const app = express();
const PORT = process.env.PORT || 8080;

app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.timestamp = Date.now();
    next();
});

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

app.use('/', about);
app.use('/', user);

app.get('/', (req, res) => {
    res.send(`Api is UP in ${Date.now() - res.locals.timestamp}`);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).end();
});

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
