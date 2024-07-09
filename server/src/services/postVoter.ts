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

export async function addDownvotee(postId: string, userId: string) {
  const upvote = await db.upvote.upsert({
    where: { postId_userId: { postId, userId } },
    update: { value: DOWNVOTE },
    create: { postId, userId, value: -1 },
  });
  return upvote;
}

export async function getTotalVotes(postId: string) {
  const upvotes = await db.upvote.aggregate({
    _sum: {
      value: true,
    },
    where: {
      postId: postId,
    },
  });

  return upvotes._sum.value || 0;
}
