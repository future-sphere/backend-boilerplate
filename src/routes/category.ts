import {
  getAllCategories,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
  getCategoryById,
} from './../controllers/category/index';
import { Router } from 'express';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.post('/', createCategory);
categoryRouter.delete('/:id', deleteCategoryById);
categoryRouter.put('/:id', updateCategoryById);

export default categoryRouter;
