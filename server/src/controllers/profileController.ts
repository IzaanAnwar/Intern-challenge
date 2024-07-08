import { type Response, type Request, type NextFunction } from 'express';
import { db } from '../config/db';

export async function getProfileInfo(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  if (!user || !user.userId) {
    console.log('lo');

    throw new Error('Please login ');
  }

  try {
    const profileInfo = await db.user.findFirst({
      where: { id: user.userId },

      select: {
        email: true,
        id: true,
        name: true,
        score: true,
      },
    });

    return res.status(200).json({ profileInfo });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}
