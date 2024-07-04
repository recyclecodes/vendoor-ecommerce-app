import { Router } from "express";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import categoryRoutes from "./category.routes.js";
import colorRoutes from "./color.routes.js";
import sizeRoutes from "./size.routes.js";
import notificationRoutes from "./notification.routes.js";
import reviewRoutes from "../routes/review.routes.js";
import cartRoutes from "./cart.routes.js";
import cartItemRoutes from "../routes/cartItem.routes.js";
import orderRoutes from "./order.routes.js";
import userRoutes from "./user.routes.js";
import orderDetailsRoutes from "./orderdetail.routes.js";
import shippingRoutes from "./shipping.routes.js";

const baseUrl = "/api/v1";
const router = Router();

router.use(`${baseUrl}/`, authRoutes);  
router.use(`${baseUrl}/products`, productRoutes);
router.use(`${baseUrl}/categories`, categoryRoutes);
router.use(`${baseUrl}/colors`, colorRoutes);
router.use(`${baseUrl}/sizes`, sizeRoutes);
router.use(`${baseUrl}/notifications`, notificationRoutes);
router.use(`${baseUrl}/reviews`, reviewRoutes);
router.use(`${baseUrl}/orders`, orderRoutes);
router.use(`${baseUrl}/carts`, cartRoutes);
router.use(`${baseUrl}/cartitems`, cartItemRoutes);
router.use(`${baseUrl}/users`, userRoutes);
router.use(`${baseUrl}/orderdetails`, orderDetailsRoutes);
router.use(`${baseUrl}/shipping`, shippingRoutes);

export default router;
