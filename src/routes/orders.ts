import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrderByPaymentIntent,
  updateOrder,
} from '../controllers/orders';

const orderRouter = Router();

orderRouter.get('/student/:id', getAllOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.post('/', createOrder);
orderRouter.delete('/', deleteOrder);
orderRouter.put('/', updateOrder);
orderRouter.get('/paymentIntent/:paymentIntentId', getOrderByPaymentIntent);

export default orderRouter;
