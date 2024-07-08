import { createPost, getAllPosts } from '../controllers/posts';
import { Router } from 'express';

const router: Router = Router();

router.get('/', getAllPosts);
router.post('/create', createPost);

export default router;
