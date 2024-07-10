import { db } from '../config/db';
const UPVOTE = 1;
const DOWNVOTE = 1;

export async function addVote(postId: string, userId: string) {
  const existingUpvote = await db.upvote.findUnique({
    where: {
      postId_userId: { postId, userId },
    },
  });

  if (existingUpvote) {
    // User already upvoted, so we remove the upvote
    await db.upvote.delete({
      where: {
        id: existingUpvote.id,
      },
    });

    return 'Vote retracted';
  } else {
    // User has not upvoted, so we add an upvote
    await db.upvote.create({
      data: {
        value: 1,
        postId,
        userId,
      },
    });
    return 'Post upvoted';
  }
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
