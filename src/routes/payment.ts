import { Router } from 'express';
import { createPaymentIntent } from '../controllers/payment';

const paymentRouter = Router();

paymentRouter.post('/intent', createPaymentIntent);

export default paymentRouter;
