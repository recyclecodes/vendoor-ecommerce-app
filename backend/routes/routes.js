import { Router } from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import categoryRoutes from './category.routes.js';
import colorRoutes from './color.routes.js';
import sizeRoutes from './size.routes.js';
import userRoutes from './user.routes.js';

const baseUrl = '/api/v1';
const router = Router();

router.use(`${baseUrl}/`, authRoutes);
router.use(`${baseUrl}/users`, userRoutes);
router.use(`${baseUrl}/products`, productRoutes);
router.use(`${baseUrl}/categories`, categoryRoutes);
router.use(`${baseUrl}/colors`, colorRoutes);
router.use(`${baseUrl}/sizes`, sizeRoutes);

export default router;
