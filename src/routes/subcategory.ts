import { getAllSubcategory } from './../controllers/subcategory';
import { Router } from 'express';

const subCategoryRouter = Router();

subCategoryRouter.get('/', getAllSubcategory);

export default subCategoryRouter;
