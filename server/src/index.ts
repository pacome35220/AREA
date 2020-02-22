import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';

import {
    saveRequestTimestamp,
    logger,
    handleServerErrorResponse
} from './middlewares';

import about from './routes/about';
import user from './routes/user';
import registrerAREA from './routes/registrerAREA';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(saveRequestTimestamp);
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use(logger);

app.use('/', about);
app.use('/', user);
app.use('/', registrerAREA);

app.get('/', (req, res) => {
    res.send(`Api is UP in ${Date.now() - res.locals.timestamp}`);
});

app.use(handleServerErrorResponse);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
