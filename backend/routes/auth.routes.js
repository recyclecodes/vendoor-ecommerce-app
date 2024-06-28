import multer from 'multer';
import { Router } from 'express';
import {
  signup,
  signin,
  confirmUserEmail,
} from '../controllers/auth.controllers.js';

const upload = multer();
const authRouter = Router();

authRouter.post('/register', upload.single('file'), signup);
authRouter.post('/login', signin);
authRouter.get('/confirm/:confirmationCode', confirmUserEmail);

export default authRouter;
