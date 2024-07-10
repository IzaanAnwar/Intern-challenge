export type Post = {
  author: {
    id: string;
    email: string;
    name: string;
    password: string;
  };
  comments: {
    id: string;
    comment: string;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];

  totalVotes: number;
  upvote: {
    id: string;
    value: number;
    postId: string;
    userId: string;
  }[];

  id: string;
  title: string;
  body: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Profile = {
  id: string;
  email: string;
  name: string;
  score: {
    id: string;
    userId: string;
    score: number;
  } | null;
};
