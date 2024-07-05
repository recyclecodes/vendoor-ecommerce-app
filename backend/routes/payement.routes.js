import { Router } from 'express';
import {
  createPayment,
  handleWebhook,
} from '../controllers/payment.controllers.js';
import { verifyAccessToken } from '../middlewares/auth.middlewares.js';

const paymentRoutes = Router();

paymentRoutes.post(
  '/',
  verifyAccessToken,
  createPayment
);
paymentRoutes.post('/webhook', handleWebhook);

export default paymentRoutes;
