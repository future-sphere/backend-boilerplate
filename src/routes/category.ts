import {
  getAllCategories,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
} from './../controllers/category/index';
import { Router } from 'express';

const orderRouter = Router();

orderRouter.get('/', getAllCategories);
orderRouter.post('/', createCategory);
orderRouter.delete('/:id', deleteCategoryById);
orderRouter.put('/:id', updateCategoryById);

export default orderRouter;
