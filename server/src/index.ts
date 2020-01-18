import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import about from './routes/about';
import user from './routes/user';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());

app.use('/', about);
app.use('/', user);

app.use((req, res, next) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
