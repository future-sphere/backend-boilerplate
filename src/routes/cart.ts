import { Router } from 'express';
import {
  addItemToCart,
  getCartByStudent,
  updateCartItemQuantity,
} from '../controllers/cart';

const cartRouter = Router();

cartRouter.post('/', addItemToCart);
cartRouter.put('/quantity', updateCartItemQuantity);
cartRouter.get('/:id/student', getCartByStudent);

export default cartRouter;
