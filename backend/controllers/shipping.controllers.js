import Shipping from "../models/shipping.model.js";
import { asyncHandler } from "../middlewares/error.middlewares.js";

const createShipping = asyncHandler(async (request, response) => {
  try {
    const { orderId, shippingAddress, deliveryDate, shippingDate } =
      request.body;

    if (!orderId) {
      return response
        .status(400)
        .send({ error: `Order #${orderId} not found!` });
    } else if (!orderId || !shippingAddress || !shippingDate) {
      return response.status(400).send({ error: "All fields are required!" });
    } else {
      const newShipping = new Shipping({
        orderId,
        shippingAddress,
        shippingDate,
        deliveryDate,
      });

      await newShipping.save();
      response
        .status(201)
        .send({ message: "New shipping created!", data: newShipping });
    }
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({
      message: error.message,
    });
  }
});

const getAllShipping = asyncHandler(async (request, response) => {
  try {
    const shipping = await Shipping.find().sort({ updatedAt: -1 });

    response
      .status(200)
      .send({ message: "All Shipping Orders", data: shipping });
  } catch (error) {
    console.error(error.message);
    res.status(response.statusCode).send({
      message: error.message,
    });
  }
});

const getShippingByOrderId = asyncHandler(async (request, response) => {
  try {
    const { orderId } = request.params;
    const shipping = await Shipping.find({ orderId }).sort({ updatedAt: -1 });

    response
      .status(200)
      .send({ message: `Order #${orderId} Shipping Details`, data: shipping });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({
      message: error.message,
    });
  }
});

const updateShipping = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const { deliveryDate, shippingDate, status } = request.body;

    const updated = await Shipping.findByIdAndUpdate(id, {
      deliveryDate,
      shippingDate,
      status,
    });

    response
      .status(200)
      .send({ message: `Shipping details updated!`, data: updated });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({
      message: error.message,
    });
  }
});

const softDeleteShipping = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const toDelete = await Shipping.findByIdAndUpdate(id, { deleted: true });

    response.status(200).send({ message: `Shipping deleted!`, data: toDelete });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({
      message: error.message,
    });
  }
});

const restoreDeletedShipping = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const toRestore = await Shipping.findByIdAndUpdate(id, { deleted: false });

    response
      .status(200)
      .send({ message: `Shipping restored!`, data: toRestore });
  } catch (error) {
    console.error(error.message);
    response.status(response.statusCode).send({
      message: error.message,
    });
  }
});

export {
  createShipping,
  getAllShipping,
  getShippingByOrderId,
  updateShipping,
  softDeleteShipping,
  restoreDeletedShipping,
};
