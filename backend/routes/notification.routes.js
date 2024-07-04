import { Router } from "express";
import {
  createNotification,
  getNotificationsById,
  markReadNotification,
  deleteNotification,
} from "../controllers/notification.controllers.js";

const notificationRouter = Router();

notificationRouter.post("/", createNotification);
notificationRouter.get("/:userId", getNotificationsById);
notificationRouter.put("/:id", markReadNotification);
notificationRouter.delete("/:id", deleteNotification);

export default notificationRouter;
