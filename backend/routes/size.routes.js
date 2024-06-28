import express from 'express';
import {
  createSize,
  getAllSizes,
  getSizeById,
  updateSizeById,
  restoreSizeById,
  softDeleteSizeById,
} from '../controllers/size.controllers.js';
import { uploadSingleFile } from '../middlewares/upload.middleware.js';

const sizeRouter = express.Router();

sizeRouter.post('/', uploadSingleFile, createSize);
sizeRouter.get('/', getAllSizes);
sizeRouter.get('/:id', getSizeById);
sizeRouter.put('/update/:id', uploadSingleFile, updateSizeById);
sizeRouter.delete('/delete/:id', softDeleteSizeById);
sizeRouter.put('/restore/:id', restoreSizeById);

export default sizeRouter;
