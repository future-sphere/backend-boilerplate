import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsByCategory,
  getProductBySlug,
  updateProduct,
} from '../controllers/products';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:slug', getProductBySlug);
productRouter.get('/category/:categoryId', getAllProductsByCategory);
productRouter.post('/', createProduct);
productRouter.delete('/', deleteProduct);
productRouter.put('/', updateProduct);

export default productRouter;
