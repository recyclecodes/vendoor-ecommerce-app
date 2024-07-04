import Order from "../models/order.model.js";
import { asyncHandler } from "../middlewares/error.middlewares.js";

const createOrder = asyncHandler(async (request, response) => {
  try {
    const { userId, totalAmount } = request.body;

    if (!userId || !totalAmount) {
      return response.status(400).send({ error: "All fields are required!" });
    }

    const newOrder = new Order({
      userId,
      totalAmount,
    });

    await newOrder.save();
    response
      .status(201)
      .send({ message: "New order created!", data: newOrder });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({
      message: error.message,
    });
  }
});

const getAllOrders = asyncHandler(async (request, response) => {
  try {
    const orders = await Order.find().sort({ updatedAt: -1 });

    response.status(200).send({ message: "All Orders", data: orders });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({ message: error.message });
  }
});

const getOrdersByUserId = asyncHandler(async (request, response) => {
  try {
    const { userId } = request.params;
    const orders = await Order.find({ userId }).sort({ updatedAt: -1 });
    response
      .status(200)
      .send({ message: `All orders for user ${userId}`, data: orders });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({ message: error.message });
  }
});

const updateOrderStatus = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const { status } = request.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, { status });

    response
      .status(200)
      .send({ message: "Order status updated!", data: updatedOrder });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({ message: error.message });
  }
});

const softDeleteOrder = asyncHandler(async (request, response) => {
  try {
    const deleteOrder = await Order.findByIdAndUpdate(request.params.id, {
      deleted: true,
    });

    response.status(200).send({ message: `Order deleted!`, data: deleteOrder });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({ message: error.message });
  }
});

const restoreOrder = asyncHandler(async (request, response) => {
  try {
    const restored = await Order.findByIdAndUpdate(request.params.id, {
      deleted: false,
    });

    response.status(200).send({ message: `Order restored!`, data: restored });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({ message: error.message });
  }
});

export {
  createOrder,
  getOrdersByUserId,
  updateOrderStatus,
  softDeleteOrder,
  getAllOrders,
  restoreOrder,
};
