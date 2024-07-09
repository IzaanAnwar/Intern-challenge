import { db } from 'config/db';
const UPVOTE = 1;
const DOWNVOTE = 1;

export async function addUpvote(postId: string, userId: string) {
  const upvote = await db.upvote.upsert({
    where: { postId_userId: { postId, userId } },
    update: { value: UPVOTE },
    create: { postId, userId, value: 1 },
  });
  return upvote;
}
