import { Router } from "express";
import {
  createShipping,
  getAllShipping,
  getShippingByOrderId,
  updateShipping,
  softDeleteShipping,
  restoreDeletedShipping,
} from "../controllers/shipping.controllers.js";

const shippingRoutes = Router();

shippingRoutes.post("/", createShipping);
shippingRoutes.get("/", getAllShipping);
shippingRoutes.get("/:orderId", getShippingByOrderId);
shippingRoutes.put("/:id", updateShipping);
shippingRoutes.delete("/delete/:id", softDeleteShipping);
shippingRoutes.put("/restore/:id", restoreDeletedShipping);

export default shippingRoutes;
