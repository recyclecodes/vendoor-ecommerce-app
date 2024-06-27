import { Router } from 'express';
import {
  signup,
  signin,
  confirmUserEmail,
} from '../controllers/auth.controllers.js';

const authRoutes = Router();

authRoutes.post('/register', signup);
authRoutes.post('/login', signin);
authRoutes.get('/confirm/:confirmationCode', confirmUserEmail);

export default authRoutes;
