import { createPost, downVote, getAllPosts, upvote } from '../controllers/posts';
import { Router } from 'express';

const router: Router = Router();

router.get('/', getAllPosts);
router.post('/create', createPost);
router.post('/upvote', upvote);
router.post('/upvote', downVote);

export default router;
