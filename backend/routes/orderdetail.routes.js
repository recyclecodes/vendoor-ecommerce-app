import { Router } from 'express';

import { getOrderDetailsByOrderId } from '../controllers/orderdetail.controllers.js';
import { verifyAccessToken } from '../middlewares/auth.middlewares.js';

const orderDetailsRoutes = Router();

orderDetailsRoutes.get(
  '/:orderId',
  verifyAccessToken,
  getOrderDetailsByOrderId
);

export default orderDetailsRoutes;
