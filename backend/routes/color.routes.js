import express from 'express';
import {
  createColor,
  getAllColors,
  getColorById,
  updateColorById,
  softDeleteColorById,
  restoreColorById,
} from '../controllers/color.controllers.js';
import { uploadSingleFile } from '../middlewares/upload.middleware.js';

const colorRouter = express.Router();

colorRouter.post('/', uploadSingleFile, createColor);
colorRouter.get('/', getAllColors);
colorRouter.get('/:id', getColorById);
colorRouter.put('/update/:id', uploadSingleFile, updateColorById);
colorRouter.delete('/delete/:id', softDeleteColorById);
colorRouter.put('/restore/:id', restoreColorById);

export default colorRouter;
