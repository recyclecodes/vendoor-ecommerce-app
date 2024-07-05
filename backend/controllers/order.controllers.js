import Order from '../models/order.model.js';
import OrderDetail from '../models/orderdetail.model.js';
import Cart from '../models/cart.model.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';

export const createOrder = asyncHandler(async (request, response, next) => {
  const userId = request.user._id;
  try {
    const cart = await Cart.findOne({ userId }).populate({
      path: 'items',
      populate: {
        path: 'productId',
        model: 'Product',
      },
    });

    if (!cart || cart.items.length === 0) {
      return response.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.productId.price,
      0
    );

    const order = new Order({
      userId,
      status: 'pending',
      totalPrice,
    });
    await order.save();

    const orderDetailsPromises = cart.items.map((item) => {
      return new OrderDetail({
        orderId: order._id,
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      }).save();
    });

    const orderDetails = await Promise.all(orderDetailsPromises);

    order.items = orderDetails.map((detail) => detail._id);
    await order.save();

    response.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

export const getOrders = asyncHandler(async (request, response, next) => {
  const userId = request.user._id;
  try {
    const orders = await Order.find({ userId }).populate({
      path: 'items',
      populate: {
        path: 'productId',
        model: 'Product',
      },
    });
    response.json(orders);
  } catch (error) {
    next(error);
  }
});

export const getOrderByOrderId = asyncHandler(
  async (request, response, next) => {
    const { orderId } = request.params;
    try {
      const order = await Order.findById(orderId).populate({
        path: 'items',
        populate: {
          path: 'productId',
          model: 'Product',
        },
      });
      if (!order) {
        return response.status(404).json({ message: 'Order not found' });
      }
      response.json(order);
    } catch (error) {
      next(error);
    }
  }
);

export const updateOrderStatusByOrderId = asyncHandler(
  async (request, response, next) => {
    const { orderId } = request.params;
    const { status } = request.body;

    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return response.status(400).json({ message: 'Invalid status value' });
    }

    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return response.status(404).json({ message: 'Order not found' });
      }

      order.status = status;
      const updatedOrder = await order.save();

      response.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
);
