import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  softDeleteCategoryById,
  restoreCategoryById,
} from '../controllers/category.controllers.js';
import { uploadSingleFile } from '../middlewares/upload.middleware.js';
import { verifyAccessToken } from '../middlewares/auth.middlewares.js';
import { checkRole } from '../middlewares/role.middleware.js';

const categoryRouter = express.Router();

categoryRouter.post(
  '/',
  verifyAccessToken,
  checkRole(['admin']),
  uploadSingleFile,
  createCategory
);
categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.put(
  '/update/:id',
  verifyAccessToken,
  checkRole(['admin']),
  uploadSingleFile,
  updateCategoryById
);
categoryRouter.delete(
  '/delete/:id',
  verifyAccessToken,
  checkRole(['admin']),
  softDeleteCategoryById
);
categoryRouter.put(
  '/restore/:id',
  verifyAccessToken,
  checkRole(['admin']),
  restoreCategoryById
);

export default categoryRouter;
