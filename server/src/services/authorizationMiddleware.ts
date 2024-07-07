import { type Response, type Request, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../types/express';
import { updateBookingStatus } from '../cron-jobs/update-booking-status';
import { runTryCatch } from '../utils/run-try-catch';
import { db } from '../config/db';
import { revokedTokens } from '../models';
import { eq } from 'drizzle-orm';

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    console.log({ authHeader });

    const token = authHeader && authHeader.split(' ').at(1);

    if (!token) {
      return res.sendStatus(401);
    }
    const [tokenData, _] = await runTryCatch(
      db.query.revokedTokens.findFirst({ where: eq(revokedTokens.token, token) }),
    );

    if (tokenData?.token === token) {
      throw new Error('Token expired');
    }
    try {
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        throw new Error('Secret not found');
      }
      console.log('[STARTING AUTHORIZATION]');

      const decoded = jwt.verify(token, secret) as User;

      req.user = decoded;
      console.log('Access granted');

      const [_data, error] = await updateBookingStatus();
      if (error) {
        console.error({ error });
      }
      next();
    } catch (error) {
      return res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
}
