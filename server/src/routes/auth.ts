import { Router } from 'express';
import { forgotPassword, login, resetPassword, signOut } from '../controllers/authController';

const router = Router();

router.post('/signin', login);
router.post('/signout', signOut);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
