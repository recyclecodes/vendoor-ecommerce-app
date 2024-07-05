import { Router } from 'express';
import {
  updateShippingStatus,
} from '../controllers/shipping.controllers.js';

const shippingRoutes = Router();

shippingRoutes.put('/status', updateShippingStatus);

export default shippingRoutes;
