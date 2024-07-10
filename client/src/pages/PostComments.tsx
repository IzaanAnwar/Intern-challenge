import { Link, useParams } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Comment, Post } from 'types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios-instance';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import moment from 'moment';

export default function PostComments() {
  const params = useParams();
  const [post, setPost] = useState<Post | undefined>();
  const [refetch, setRefetch] = useState(true);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutationPending, setIsMutationPending] = useState(false);
  const [commentText, setCommentText] = useState<string>('');
  // const createPost = async () => {
  //   if (!title || !body) {
  //     toast.error('Title or Body Missing');
  //     return;
  //   }
  //   setIsMutationPending(true);
  //   try {
  //     const res = await api.post('/posts/create', { title, body });
  //     if (res.status !== 201) {
  //       throw new Error('Error creating  post');
  //     }
  //     const allPosts = res.data?.posts as Post[] | undefined;
  //     setPosts(allPosts);
  //   } catch (error: any) {
  //     let errMsg = '';
  //     if (error instanceof AxiosError) {
  //       errMsg = error.response?.data?.message;
  //     } else {
  //       errMsg = error?.message || 'Something went wrong. Please try again';
  //     }

  //     toast.error('Error', { description: errMsg });
  //   } finally {
  //     setIsMutationPending(false);
  //     setRefetch(true);
  //   }
  // };
  useEffect(() => {
    async function getAllPosts() {
      try {
        console.log({ params });

        const res = await api.get(`/posts/${params?.postId}`);
        if (res.status !== 200) {
          throw new Error('Error getting post data');
        }
        const data = res.data?.post as Post | undefined;
        setPost(data);
      } catch (error: any) {
        let errMsg = '';
        if (error instanceof AxiosError) {
          errMsg = error.response?.data?.message;
        } else {
          errMsg = error?.message || 'Something went wrong. Please try again';
        }

        toast.error('Error', { description: errMsg });
      } finally {
        setIsLoading(false);
        setRefetch(false);
      }
    }
    if (refetch) {
      getAllPosts();
    }
  }, [refetch]);

  const handlePostComment = async () => {
    try {
      setIsMutationPending(true);
      const response = await api.post('/posts/comment', {
        comment: commentText,
        postId: params?.postId,
      });
      setComments([...comments, response.data]);
      setRefetch(true);
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setIsMutationPending(false);
    }
  };

  const handleReply = async (parentId: string, replyText: string) => {
    try {
      const response = await api.post(`/posts/comment/reply`, {
        reply: replyText,
        commentId: parentId,
        postId: params?.postId,
      });
      const updatedComments = comments.map((comment) =>
        comment.id === parentId ? { ...comment, replies: [...comment.replies, response.data] } : comment,
      );
      setComments(updatedComments);
      setRefetch(true);
    } catch (error) {
      console.error('Failed to post reply:', error);
    }
  };

  const handleVote = async (postId: string) => {
    try {
      const res = await api.post('/posts/vote', { postId });
      if (res.status !== 200) {
        throw new Error(`Error Voting post`);
      }
      setPost((prevPost) => ({ ...prevPost!, totalVotes: res.data.totalVotes as number }));
      setRefetch(true);
    } catch (error: any) {
      let errMsg = '';
      if (error instanceof AxiosError) {
        errMsg = error.response?.data?.message;
      } else {
        errMsg = error?.message || 'Something went wrong. Please try again';
      }

      toast.error('Error', { description: errMsg });
    }
  };
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 md:px-0 bg-background">
      <PostContainer title={post?.title!} body={post?.body!} author={post?.author.name!} createdAt={post?.createdAt!} />
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Comments</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-1 pb-6">
              <Textarea
                placeholder="Add a comment..."
                className="mb-2 "
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button
                size="sm"
                onClick={async () => {
                  if (!commentText) {
                    toast.error('No Input');
                    return;
                  }
                  await handlePostComment();
                }}
                loading={isMutationPending}
              >
                Post Comment
              </Button>
            </div>
          </div>
          <div className="space-y-4  ">
            {post?.comments.map(
              (comment) =>
                !comment.parentId && <CommentThread key={comment.id} comment={comment} onReply={handleReply} />,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type CommentThreadProps = {
  comment: Comment;
  onReply: (parentId: string, replyText: string) => Promise<void>;
};

function CommentThread({ comment, onReply }: CommentThreadProps) {
  const [replyText, setReplyText] = useState<string>('');

  return (
    <div className=" pb-4 ">
      <div className="bg-foreground/10 p-2">
        <div className="flex items-center gap-2 font-bold ">
          <p className="text-sm">{comment.author.name}</p>
          <div className="text-xs font-medium text-muted-foreground">{moment(comment.createdAt).fromNow()}</div>
        </div>
        <p className="mt-1 ">{comment.comment}</p>
      </div>
      <div className=" space-y-4 border-l-2 border-foreground/40 ml-2 w-full ">
        {comment.replies.map((reply) => (
          <div key={reply.id} className="p-2">
            <div className="flex items-center gap-2 ">
              <p className="font-bold text-sm">{reply.author?.name}</p>
              <div className="text-xs text-muted-foreground">{moment(reply.createdAt).fromNow()}</div>
            </div>
            <p className="mt-1">{reply.comment}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-start gap-4">
        <div className="flex-1">
          <Textarea
            placeholder="Reply to this comment..."
            className="mb-2 resize-none"
            onChange={(e) => setReplyText(e.target.value)}
          />
          <Button size="sm" onClick={async () => await onReply(comment.id, replyText)}>
            Post Reply
          </Button>
        </div>
      </div>
    </div>
  );
}
function PostContainer(props: { title: string; body: string; author: string | undefined; createdAt: Date }) {
  return (
    <Card className="space-y-6">
      <CardHeader>
        <CardTitle className="text-3xl font-bold mb-2">{props.title}</CardTitle>
        <CardDescription className="flex justify-start items-center gap-2">
          Posted by <p className="font-bold">u/{props.author}</p> on {moment(props.createdAt!).format('DD-MM-YYYY')}
        </CardDescription>
      </CardHeader>
      <CardContent className="prose prose-lg dark:prose-invert">{props.body}</CardContent>
    </Card>
  );
}
