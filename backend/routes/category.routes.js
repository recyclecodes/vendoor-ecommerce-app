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

const categoryRouter = express.Router();

categoryRouter.post('/', uploadSingleFile, createCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:id', getCategoryById);
categoryRouter.put('/update/:id', uploadSingleFile, updateCategoryById);
categoryRouter.delete('/delete/:id', softDeleteCategoryById);
categoryRouter.put('/restore/:id', restoreCategoryById);

export default categoryRouter;
