import { Router } from 'express';
import { check, signin, signup } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/signin', signin);
authRouter.post('/signup', signup);
authRouter.get('/check', check);

export default authRouter;
