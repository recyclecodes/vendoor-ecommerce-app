import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderByOrderId,
  updateOrderStatusByOrderId,

} from '../controllers/order.controllers.js';
import { verifyAccessToken } from '../middlewares/auth.middlewares.js';

const orderRoutes = Router();

orderRoutes.post('/', verifyAccessToken, createOrder);
orderRoutes.get('/', verifyAccessToken, getOrders);
orderRoutes.get('/:orderId', verifyAccessToken, getOrderByOrderId);
orderRoutes.put('/status/:orderId', verifyAccessToken, updateOrderStatusByOrderId);

export default orderRoutes;
