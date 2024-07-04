import { Router } from "express";

import {
  createOrderDetail,
  getOrderDetailByOrderId,
  updateOrderDetail,
  softDeleteOrderDetail,
  getAllOrderDetails,
  restoreOrderDetail,
} from "../controllers/orderdetail.controllers.js";

const orderDetailsRoutes = Router();

orderDetailsRoutes.post("/", createOrderDetail);
orderDetailsRoutes.get("/", getAllOrderDetails);
orderDetailsRoutes.get("/:orderId", getOrderDetailByOrderId);
orderDetailsRoutes.put("/:id", updateOrderDetail);
orderDetailsRoutes.delete("/delete/:id", softDeleteOrderDetail);
orderDetailsRoutes.put("/restore/:id", restoreOrderDetail);

export default orderDetailsRoutes;
