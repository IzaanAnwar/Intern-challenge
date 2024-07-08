import { getProfileInfo } from '../controllers/profileController';
import { Router } from 'express';

const router: Router = Router();

router.get('/', getProfileInfo);

export default router;
