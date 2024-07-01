import { Router } from 'express';
import {
  signup,
  signin,
  confirmUserEmail,
  sendPasswordResetEmail,
  resetPassword,
  getResetToken,
} from '../controllers/auth.controllers.js';
import { uploadSingleFile } from '../middlewares/upload.middleware.js';

const authRouter = Router();

authRouter.post('/register', uploadSingleFile, signup);
authRouter.post('/login', uploadSingleFile, signin);
authRouter.get('/confirm/:confirmationCode', confirmUserEmail);
authRouter.post('/reset-password', uploadSingleFile, sendPasswordResetEmail);
authRouter.get('/reset/:resetToken', getResetToken);
authRouter.post('/reset/:resetToken', uploadSingleFile, resetPassword);

export default authRouter;
