import { Router } from 'express';
import {
  createCart,
  getCartByUserId,
  clearCart,
} from '../controllers/cart.controllers.js';
import { uploadSingleFile } from '../middlewares/upload.middleware.js';
import { verifyAccessToken } from '../middlewares/auth.middlewares.js';

const cartRouter = Router();

cartRouter.post('/', verifyAccessToken, uploadSingleFile, createCart);
cartRouter.get('/:userId', verifyAccessToken, getCartByUserId);
cartRouter.delete('/:cartId', verifyAccessToken, clearCart);

export default cartRouter;
