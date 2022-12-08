import { Router } from 'express';
import categoryRouter from './category';
import orderRouter from './orders';
import productRouter from './products';
import studentRouter from './students';

const baseRouter = Router();

baseRouter.use('/products', productRouter);
baseRouter.use('/orders', orderRouter);
baseRouter.use('/students', studentRouter);
baseRouter.use('/category', categoryRouter);

export default baseRouter;
