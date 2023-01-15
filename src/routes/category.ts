import {
  getAllCategories,
  createCategory,
  deleteCategoryById,
  updateCategoryById,
  getCategoryBySlug,
} from './../controllers/category/index';
import { Router } from 'express';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:slug', getCategoryBySlug);
categoryRouter.post('/', createCategory);
categoryRouter.delete('/:id', deleteCategoryById);
categoryRouter.put('/:id', updateCategoryById);

export default categoryRouter;
