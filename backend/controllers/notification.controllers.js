import Notifications from "../models/notification.model.js";
import { asyncHandler } from "../middlewares/error.middlewares.js";

const createNotification = asyncHandler(async (request, response) => {
  try {
    const { userId, message } = request.body;

    if (!userId || !message) {
      return response
        .status(400)
        .send({ error: "User ID and message are requiredd!" });
    }

    const newNotification = new Notifications({
      userId,
      message,
    });

    await newNotification.save();
    response.status(201).send({
      message: "New notification created!",
      data: newNotification,
    });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({
      message: error.message,
    });
  }
});

const getNotificationsById = asyncHandler(async (request, response) => {
  try {
    const { userId } = request.params;

    const notifications = await Notifications.find({ userId }).sort({
      createdAt: -1,
    });
    response.status(200).send({
      message: `All Notifications for user ${userId}`,
      data: notifications,
    });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({
      message: error.message,
    });
  }
});

const markReadNotification = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const notification = await Notifications.findByIdAndUpdate(id, {
      read: true,
    });

    if (!notification) {
      return response.status(400).send({ error: "Notification not found" });
    } else {
      response
        .status(200)
        .send({ message: "Notification marked as read!", data: notification });
    }
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({
      message: error.message,
    });
  }
});

const deleteNotification = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const notification = await Notifications.findByIdAndDelete(id);

    if (!notification) {
      return response.status(400).send({ error: "Notification not found" });
    } else {
      response.status(200).send({ message: "Notification deleted!" });
    }
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({
      message: error.message,
    });
  }
});

export {
  createNotification,
  getNotificationsById,
  markReadNotification,
  deleteNotification,
};
