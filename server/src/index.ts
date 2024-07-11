import express, { type Response, type Request, type NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;
import authRouter from './routes/auth';
import postsRouter from './routes/posts';
import profileRouter from './routes/profile';

import { authenticateToken } from './services/authorizationMiddleware';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const appUrl = process.env.APP_URL;

app.use(
  cors({
    origin: appUrl,
    credentials: true,
  }),
);

app.get('/api/hello', (req, res) => {
  res.send('hello world');
});

app.use('/api/', authRouter);
app.use('/api/posts/', authenticateToken, postsRouter);
app.use('/api/profile/', profileRouter);

/* Error handler middleware */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = err.message;

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 400;
      const errMeta = (err.meta?.target as string) || 'unknown';
      message = errMeta.split('_').at(-2) + ' already exsits';
      console.log({ err: err, meta: err.meta });
    }
    // Add more Prisma error codes handling as needed
  }
  // Log the error details for debugging
  console.error({
    errorType: err.constructor.name,
    errorMessage: message,
    stack: err.stack,
  });

  res.status(statusCode).json({ message });
  return;
});

app.listen(Number(port), () => {
  console.log(`App listening at ${port}`);
});
