import CartItem from '../models/cartItem.model.js';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';

export const createMultipleCartItems = asyncHandler(
  async (request, response, next) => {
    const { cartId, products } = request.body;

    const cartItems = [];

    for (const item of products) {
      const { productId, quantity } = item;

      const product = await Product.findById(productId);
      if (!product) {
        return response
          .status(404)
          .json({ message: `Product with ID ${productId} not found` });
      }

      if (product.stock < quantity) {
        return response.status(400).json({
          message: `Insufficient stock for product with ID ${productId}`,
        });
      }

      const cartItem = new CartItem({ cartId, productId, quantity });
      await cartItem.save();
      cartItems.push(cartItem);

      const cart = await Cart.findById(cartId);
      if (!cart) {
        return response.status(404).json({ message: 'Cart not found' });
      }
      cart.items.push(cartItem._id);
      await cart.save();
    }

    response.status(201).json(cartItems);
  }
);

export const getCartItemsByCartId = asyncHandler(
  async (request, response, next) => {
    try {
      const { cartId } = request.params;

      const cartItems = await CartItem.find({ cartId });

      response.status(200).json(cartItems);
    } catch (error) {
      next(error);
    }
  }
);

export const updateCartItemById = asyncHandler(
  async (request, response, next) => {
    try {
      const { cartItemId } = request.params;
      const { quantity } = request.body;

      let cartItem = await CartItem.findById(cartItemId);
      if (!cartItem) {
        return response.status(404).json({ message: 'Cart item not found' });
      }

      const product = await Product.findById(cartItem.productId);
      if (!product) {
        return response.status(404).json({ message: 'Product not found' });
      }

      if (product.stock < quantity) {
        return response
          .status(400)
          .json({ message: 'Insufficient stock for this product' });
      }

      cartItem.quantity = quantity;
      await cartItem.save();

      response.status(200).json(cartItem);
    } catch (error) {
      next(error);
    }
  }
);

export const deleteCartItemById = asyncHandler(
  async (request, response, next) => {
    try {
      const { cartItemId } = request.params;

      const deletedCartItem = await CartItem.findByIdAndDelete(cartItemId);
      if (!deletedCartItem) {
        return response
          .status(404)
          .json({ message: 'Cart item not found for deletion' });
      }

      const cart = await Cart.findOneAndUpdate(
        { _id: deletedCartItem.cartId },
        { $pull: { items: cartItemId } },
        { new: true }
      );

      if (!cart) {
        return response.status(404).json({ message: 'Cart not found' });
      }

      response
        .status(200)
        .json({ message: 'Cart item deleted successfully', cart });
    } catch (error) {
      next(error);
    }
  }
);
