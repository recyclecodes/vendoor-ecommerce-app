import Shipping from '../models/shipping.model.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';

export const updateShippingStatus = asyncHandler(
  async (request, response, next) => {
    const { shippingId, status } = request.body;

    const validStatuses = [
      'Pending',
      'Shipped',
      'In Transit',
      'Delivered',
      'Cancelled',
    ];
    if (!validStatuses.includes(status)) {
      return response.status(400).json({ message: 'Invalid status value' });
    }

    try {
      const shipping = await Shipping.findById(shippingId);
      if (!shipping) {
        return response
          .status(404)
          .json({ message: 'Shipping record not found' });
      }

      shipping.status = status;
      const updatedShipping = await shipping.save();

      response.json(updatedShipping);
    } catch (error) {
      next(error);
    }
  }
);
