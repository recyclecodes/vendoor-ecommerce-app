import { Router } from 'express';
import {
  createProduct,
  getProductById,
  updateProductById,
  softDeleteProductById,
  restoreProductById,
  getAllProducts,
} from '../controllers/product.controllers.js';
import { uploadSingleImage } from '../middlewares/upload.middleware.js';
import { verifyAccessToken } from '../middlewares/auth.middlewares.js';
import { checkRole } from '../middlewares/role.middleware.js';

const productRouter = Router();

productRouter.post(
  '/',
  verifyAccessToken,
  checkRole(['admin']),
  uploadSingleImage,
  createProduct
);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.put(
  '/update/:id',
  verifyAccessToken,
  checkRole(['admin']),
  uploadSingleImage,
  updateProductById
);
productRouter.delete(
  '/delete/:id',
  verifyAccessToken,
  checkRole(['admin']),
  softDeleteProductById
);
productRouter.put(
  '/restore/:id',
  verifyAccessToken,
  checkRole(['admin']),
  restoreProductById
);

export default productRouter;
