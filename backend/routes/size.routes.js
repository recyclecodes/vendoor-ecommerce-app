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
import { verifyAccessToken } from '../middlewares/auth.middlewares.js';
import { checkRole } from '../middlewares/role.middleware.js';

const sizeRouter = express.Router();

sizeRouter.post(
  '/',
  verifyAccessToken,
  checkRole(['admin']),
  uploadSingleFile,
  createSize
);
sizeRouter.get('/', verifyAccessToken, getAllSizes);
sizeRouter.get('/:id', verifyAccessToken, getSizeById);
sizeRouter.put(
  '/update/:id',
  verifyAccessToken,
  checkRole(['admin']),
  uploadSingleFile,
  updateSizeById
);
sizeRouter.delete(
  '/delete/:id',
  verifyAccessToken,
  checkRole(['admin']),
  softDeleteSizeById
);
sizeRouter.put(
  '/restore/:id',
  verifyAccessToken,
  checkRole(['admin']),
  restoreSizeById
);

export default sizeRouter;
