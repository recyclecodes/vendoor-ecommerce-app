import { Router } from "express";
import {
  createOrder,
  getOrdersByUserId,
  getAllOrders,
  updateOrderStatus,
  softDeleteOrder,
  restoreOrder,
} from "../controllers/order.controllers.js";

const orderRoutes = Router();

orderRoutes.post("/", createOrder);
orderRoutes.get("/", getAllOrders);
orderRoutes.get("/:userId", getOrdersByUserId);
orderRoutes.put("/:id", updateOrderStatus);
orderRoutes.delete("/delete/:id", softDeleteOrder);
orderRoutes.put("/restore/:id", restoreOrder);

export default orderRoutes;
