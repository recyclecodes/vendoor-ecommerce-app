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
import { verifyAccessToken } from '../middlewares/auth.middlewares.js';
import { checkRole } from '../middlewares/role.middleware.js';

const colorRouter = express.Router();

colorRouter.post(
  '/',
  verifyAccessToken,
  checkRole(['admin']),
  uploadSingleFile,
  createColor
);
colorRouter.get('/', getAllColors);
colorRouter.get('/:id', getColorById);
colorRouter.put(
  '/update/:id',
  verifyAccessToken,
  checkRole(['admin']),
  uploadSingleFile,
  updateColorById
);
colorRouter.delete(
  '/delete/:id',
  verifyAccessToken,
  checkRole(['admin']),
  softDeleteColorById
);
colorRouter.put(
  '/restore/:id',
  verifyAccessToken,
  checkRole(['admin']),
  restoreColorById
);

export default colorRouter;
