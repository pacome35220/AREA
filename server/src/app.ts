import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import { handleServerErrorResponse } from './middlewares';

import about from './routes/about';
import user from './routes/user';
import genericArea from './routes/genericArea';
import specificArea from './routes/specificArea';

export const app = express();

app.use(
    morgan(
        ':remote-addr - :remote-user [:date[clf]] :method :url :status :response-time ms'
    )
);
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use('/', about);
app.use('/', user);
app.use('/', genericArea);
app.use('/', specificArea);

app.get('/', (req, res) => {
    res.send('Api is UP');
});

app.use(handleServerErrorResponse);
