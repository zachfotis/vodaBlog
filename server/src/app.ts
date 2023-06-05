import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import express from 'express';

import 'express-async-errors';
import { NotFoundError } from './errors/index';
import { errorHandler } from './middlewares/index';
import { authRouter } from './routes/auth';

const app = express();

app.use(json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'docker',
    httpOnly: true,
  })
);

app.use('/api/auth', authRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
