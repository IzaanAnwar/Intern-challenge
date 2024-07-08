import { type Response, type Request, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../types/express';
import { db } from '../config/db';

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    console.log({ authHeader });

    const token = authHeader && authHeader.split(' ').at(1);

    if (!token) {
      return res.sendStatus(401);
    }
    const tokenData = await db.revokedTokens.findFirst({ where: { token: token } });

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

      next();
    } catch (error) {
      return res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
}
