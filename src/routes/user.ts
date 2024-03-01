import { getAllUsers } from '../controllers/user';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  const users = await getAllUsers();
  return res.json(users);
});

export default userRouter;
