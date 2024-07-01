import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserProfile,
  deleteUserAccountById,
  restoreUserAccountById,
  updateUserById,
  getCurrentUser,
} from '../controllers/user.controllers.js';
import { verifyAccessToken } from '../middlewares/auth.middlewares.js';
import { checkRole } from '../middlewares/role.middleware.js';
import { uploadSingleImage } from '../middlewares/upload.middleware.js';

const userRouter = express.Router();

// Admin routes
userRouter.get('/', verifyAccessToken, checkRole(['admin']), getAllUsers);
userRouter.delete(
  '/delete/:id',
  verifyAccessToken,
  checkRole(['admin']),
  deleteUserAccountById
);
userRouter.put(
  '/restore/:id',
  verifyAccessToken,
  checkRole(['admin']),
  restoreUserAccountById
);
userRouter.put(
  '/update/:id',
  verifyAccessToken,
  uploadSingleImage,
  checkRole(['admin']),
  updateUserById
);
userRouter.get(
  '/profile/:id',
  verifyAccessToken,
  checkRole(['admin']),
  getUserById
);

// User routes
userRouter.put(
  '/update-profile',
  verifyAccessToken,
  uploadSingleImage,
  updateUserProfile
);

userRouter.get('/me', verifyAccessToken, getCurrentUser);

export default userRouter;
