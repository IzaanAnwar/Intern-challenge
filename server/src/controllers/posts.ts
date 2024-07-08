import { type Response, type Request, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { db } from '../config/db';
import { createPostSchema } from '../utils/zod-schema';

dotenv.config();

export async function createPost(req: Request, res: Response, next: NextFunction) {
  const body = await req.body;
  const user = await req.user;
  if (!user || !user.userId) {
    throw new Error('Please login ');
  }

  try {
    const bodyParsed = createPostSchema.parse(body);

    const postCreated = await db.post.create({
      data: {
        title: bodyParsed.title,
        body: bodyParsed.body,
        authorId: user.userId,
      },
    });
    if (!postCreated) {
      throw new Error('Could not create post');
    }

    return res.status(201).json({ postId: postCreated.id });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}

export async function getAllPosts(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  if (!user || !user.userId) {
    throw new Error('Please login ');
  }

  try {
    const posts = await db.post.findMany();

    return res.status(200).json({ posts });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}
