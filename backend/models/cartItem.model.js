import { Schema, model } from 'mongoose';

const cartItemSchema = new Schema(
  {
    cartId: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const CartItem = model('CartItem', cartItemSchema);

export default CartItem;
