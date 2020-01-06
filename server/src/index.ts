import express from 'express';
import compression from 'compression';
import helmet from 'helmet';

import about from './about';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(compression());
app.use(helmet());

app.use('/', about);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
