import { createPost, getAllPosts, voteAPost } from '../controllers/posts';
import { Router } from 'express';

const router: Router = Router();

router.get('/', getAllPosts);
router.post('/create', createPost);
router.post('/vote', voteAPost);

export default router;
