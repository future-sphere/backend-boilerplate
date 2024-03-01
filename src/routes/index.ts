import { Router } from 'express';
import userRouter from './user';

const baseRouter = Router();

baseRouter.use('/user', userRouter);
baseRouter.get('/health', (req, res) => {
  res.send('OK22');
});

export default baseRouter;
