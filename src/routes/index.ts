import { Router } from 'express';
import categoryRouter from './category';
import orderRouter from './orders';
import productRouter from './products';
import reviewRouter from './review';
import studentRouter from './students';
import subCategoryRouter from './subcategory';

const baseRouter = Router();

baseRouter.use('/products', productRouter);
baseRouter.use('/orders', orderRouter);
baseRouter.use('/students', studentRouter);
baseRouter.use('/category', categoryRouter);
baseRouter.use('/reviews', reviewRouter);
baseRouter.use('/subcategory', subCategoryRouter);
baseRouter.get('/health', (req, res) => {
  res.send('OK');
});

export default baseRouter;
