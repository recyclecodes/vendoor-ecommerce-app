import Cart from '../models/cart.model.js';
import User from '../models/auth.model.js';
import CartItem from '../models/cartItem.model.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';

export const createCart = asyncHandler(async (request, response, next) => {
  try {
    const { userId } = request.body;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
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

export const clearCart = asyncHandler(async (req, res, next) => {
  const { cartId } = req.params;

  const cart = await Cart.findById(cartId);
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  await CartItem.deleteMany({ cartId });
  cart.items = [];
  await cart.save();

  res.status(200).json({ message: 'Cart cleared' });
});
