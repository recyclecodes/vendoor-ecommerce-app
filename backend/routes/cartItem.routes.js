import { Router } from 'express';
import {
  createMultipleCartItems,
  getCartItemsByCartId,
  updateCartItemById,
  deleteCartItemById,
} from '../controllers/cartItem.controllers.js';
import { uploadSingleFile } from '../middlewares/upload.middleware.js';
import { verifyAccessToken } from '../middlewares/auth.middlewares.js';

const cartItemRouter = Router();

cartItemRouter.post(
  '/',
  verifyAccessToken,
  uploadSingleFile,
  createMultipleCartItems
);
cartItemRouter.get('/:cartId', verifyAccessToken, getCartItemsByCartId);
cartItemRouter.put(
  '/:cartItemId',
  verifyAccessToken,
  uploadSingleFile,
  updateCartItemById
);
cartItemRouter.delete('/:cartItemId', verifyAccessToken, deleteCartItemById);

export default cartItemRouter;
