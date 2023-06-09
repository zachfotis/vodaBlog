import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import express from 'express';

import 'express-async-errors';
import { NotFoundError } from './errors/index';
import { errorHandler } from './middlewares/index';
import { authRouter } from './routes/authRouter';
import { postsRouter } from './routes/postsRouter';

const app = express();

if (process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'docker') {
  app.set('trust proxy', true);
}

app.use(json());
app.use(express.urlencoded({ extended: true }));
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
    sameSite: process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'docker' ? 'none' : 'lax',
    httpOnly: true,
  })
);

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
