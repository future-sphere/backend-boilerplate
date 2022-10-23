import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsByCategory,
  getProductById,
  updateProduct,
} from '../controllers/products';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.get('/category/:categoryId', getAllProductsByCategory);
productRouter.post('/', createProduct);
productRouter.delete('/', deleteProduct);
productRouter.put('/', updateProduct);

export default productRouter;
