import OrderDetail from "../models/orderdetail.model.js";
import { asyncHandler } from "../middlewares/error.middlewares.js";

const createOrderDetail = asyncHandler(async (request, response) => {
  try {
    const { orderId, productId, quantity, totalAmount } = request.body;

    if (!productId || !orderId || !totalAmount || !quantity) {
      return response.status(400).send({ error: "All fields are required!" });
    }

    const newOrderDetail = new OrderDetail({
      orderId,
      productId,
      quantity,
      totalAmount,
    });

    await newOrderDetail.save();
    response
      .status(201)
      .send({ message: "New order created!", data: newOrderDetail });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({
      message: error.message,
    });
  }
});

const getAllOrderDetails = asyncHandler(async (request, response) => {
  try {
    const orders = await OrderDetail.find().sort({ updatedAt: -1 });

    response
      .status(200)
      .send({ message: "All Orders with their Details", data: orders });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({ message: error.message });
  }
});

const getOrderDetailByOrderId = asyncHandler(async (request, response) => {
  try {
    const { orderId } = request.params;
    const details = await OrderDetail.find({ orderId }).sort({ updatedAt: -1 });
    response
      .status(200)
      .send({ message: `Details for Order #${orderId}`, data: details });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({ message: error.message });
  }
});

const updateOrderDetail = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const { productId, quantity, totalAmount } = request.body;

    if (!id) {
      return response.status(404).send({ message: "Order details Not Found" });
    }

    const updatedOrder = await OrderDetail.findByIdAndUpdate(id, {
      productId,
      quantity,
      totalAmount,
    });

    response
      .status(200)
      .send({ message: "Order Details updated!", data: updatedOrder });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({ message: error.message });
  }
});

const softDeleteOrderDetail = asyncHandler(async (request, response) => {
  try {
    const deleteOrder = await OrderDetail.findByIdAndUpdate(request.params.id, {
      deleted: true,
    });

    response
      .status(200)
      .send({ message: `Order Details deleted!`, data: deleteOrder });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({ message: error.message });
  }
});

const restoreOrderDetail = asyncHandler(async (request, response) => {
  try {
    const restored = await OrderDetail.findByIdAndUpdate(request.params.id, {
      deleted: false,
    });

    response
      .status(200)
      .send({ message: `Order Details retored!`, data: restored });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({ message: error.message });
  }
});

export {
  createOrderDetail,
  getOrderDetailByOrderId,
  updateOrderDetail,
  softDeleteOrderDetail,
  getAllOrderDetails,
  restoreOrderDetail,
};
