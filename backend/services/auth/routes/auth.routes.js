import express from 'express';
import { signUpWithEmail, signInWithEmail, signInWithGoogle, signOut, getUserSession } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signUpWithEmail);
router.post('/signin', signInWithEmail);
router.get('/google', signInWithGoogle);
router.post('/signout', signOut);
router.get('/session', getUserSession);

export default router;
