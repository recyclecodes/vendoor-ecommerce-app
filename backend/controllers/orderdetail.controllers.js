import OrderDetail from '../models/orderdetail.model.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';

export const getOrderDetailsByOrderId = asyncHandler(
  async (request, response, next) => {
    const { orderId } = request.params;
    try {
      const orderDetails = await OrderDetail.find({ orderId }).populate(
        'productId'
      );
      response.json(orderDetails);
    } catch (error) {
      next(error);
    }
  }
);
