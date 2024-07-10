import express, { type Response, type Request, type NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';
import { MongoError } from 'mongodb';
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
app.use('/api/posts/', authenticateToken, postsRouter);
app.use('/api/profile/', authenticateToken, profileRouter);

/* Error handler middleware */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Default status code for errors
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Handle specific MongoDB errors
  if (err instanceof MongoError) {
    if (err.message.includes('Malformed ObjectID')) {
      statusCode = 400; // Bad Request
      message = 'Invalid ObjectID provided';
    } else {
      message = err.errmsg;
    }
  }
  console.error({ err });
  res.status(statusCode).json({ message });

  return;
});

app.listen(Number(port), () => {
  console.log(`App listening at ${port}`);
});
