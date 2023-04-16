import { Router } from 'express';
import { addItemToCart } from '../controllers/cart';

const cartRouter = Router();

cartRouter.post('/', addItemToCart);

export default cartRouter;
