import Cart from '../models/cart.model.js';
import User from '../models/auth.model.js';
import CartItem from '../models/cartItem.model.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';

export const createCart = asyncHandler(async (request, response, next) => {
  try {
    const userId = request.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    const existingCart = await Cart.findOne({ userId, deleted: false });

    if (existingCart) {
      return response
        .status(400)
        .json({ message: 'User already has an active cart' });
    }

    const cart = new Cart({ userId });
    await cart.save();

    response.status(201).json(cart);
  } catch (error) {
    next(error);
  }
});

export const getCartByUserId = asyncHandler(async (request, response, next) => {
  try {
    const { userId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: 'items',
      populate: {
        path: 'productId',
        model: 'Product',
      },
    });

    if (!cart) {
      return response.status(404).json({ message: 'Cart not found' });
    }

    response.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

export const clearCart = asyncHandler(async (request, response, next) => {
  const { cartId } = request.params;

  const cart = await Cart.findById(cartId);
  if (!cart) {
    return response.status(404).json({ message: 'Cart not found' });
  }

  await CartItem.deleteMany({ cartId });
  cart.items = [];
  await cart.save();

  response.status(200).json({ message: 'Cart cleared' });
});
