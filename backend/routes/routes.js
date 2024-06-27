import { Router } from 'express';
import authRoutes from './auth.routes.js';


const baseUrl = '/api/v1';
const router = Router();

router.use(`${baseUrl}/`, authRoutes);


export default router;
