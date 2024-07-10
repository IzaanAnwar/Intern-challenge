import { type Response, type Request, type NextFunction } from 'express';
import dotenv from 'dotenv';
import { db } from '../config/db';
import { createPostSchema } from '../utils/zod-schema';
import { z } from 'zod';
import { addVote } from '../services/postVoter';

dotenv.config();
const NEW_POST_SCORE = 10;
export async function createPost(req: Request, res: Response, next: NextFunction) {
  const body = await req.body;
  const user = await req.user;
  try {
    if (!user || !user.userId) {
      throw new Error('Please login ');
    }

    const bodyParsed = createPostSchema.parse(body);
    const transcationRes = await db.$transaction([
      db.post.create({
        data: {
          title: bodyParsed.title,
          body: bodyParsed.body,
          authorId: user.userId,
        },
      }),
      db.scores.upsert({
        where: { userId: user.userId },
        create: {
          userId: user.userId,
          score: NEW_POST_SCORE,
        },
        update: {
          score: {
            increment: NEW_POST_SCORE,
          },
        },
      }),
    ]);
    if (!transcationRes) {
      throw new Error('Could not create post');
    }

    return res.status(201).json({ postId: transcationRes[0].id });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}

export async function getAllPosts(req: Request, res: Response, next: NextFunction) {
  const user = req.user;

  try {
    if (!user || !user.userId) {
      console.log('lo');

      throw new Error('Please login ');
    }
    const posts = await db.post.findMany({
      orderBy: { updatedAt: 'desc' },
      include: { author: true, comments: true, upvote: true },
    });
    const postsWithTotalVotes = posts.map((post) => {
      const totalVotes = post.upvote.reduce((sum, upvote) => sum + upvote.value, 0);
      console.log({ totalVotes });

      return {
        ...post,
        totalVotes,
      };
    });

    return res.status(200).json({ posts: postsWithTotalVotes });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}

export async function voteAPost(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  try {
    const body = z.object({ postId: z.string(), userId: z.string() }).parse(await req.body);

    if (!user || !user.userId) {
      console.log('lo');

      throw new Error('Please login ');
    }
    const message = await addVote(body.postId, body.userId);

    return res.status(200).json({ message });
  } catch (error) {
    next(error); // Pass errors to your error-handling middleware
  }
}
