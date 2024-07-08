import express, { type Response, type Request, type NextFunction } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;
import authRouter from './routes/auth';

import { authenticateToken } from './services/authorizationMiddleware';

app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const appUrl = 'http://localhost:5173';

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
app.use('/api/posts', authenticateToken, authRouter);

/* Error handler middleware */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const statusCode = err?.statusCode || 500;
  console.error({ message: err.message }, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(Number(port), () => {
  console.log(`App listening at ${port}`);
});
