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
} & {
  id: string;
  title: string;
  body: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};
