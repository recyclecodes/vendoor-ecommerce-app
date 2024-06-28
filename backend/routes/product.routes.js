import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  softDeleteProductById,
  restoreProductById,
} from '../controllers/product.controllers.js';
import { uploadSingleImage } from '../middlewares/upload.middleware.js';

const productRouter = Router();

productRouter.post('/', uploadSingleImage, createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.put('/update/:id', uploadSingleImage, updateProductById);
productRouter.delete('/delete/:id', softDeleteProductById);
productRouter.post('/restore/:id', restoreProductById);

export default productRouter;
