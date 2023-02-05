import { getAllProductsBySubcategory, getAllSubcategory } from './../controllers/subcategory';
import { Router } from 'express';

const subCategoryRouter = Router();

subCategoryRouter.get('/', getAllSubcategory);
subCategoryRouter.get('/:slug', getAllProductsBySubcategory);

export default subCategoryRouter;

