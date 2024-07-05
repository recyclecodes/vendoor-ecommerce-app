import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'OrderDetail',
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'processing', 'paid', 'completed', 'cancelled'],
      default: 'pending',
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
    },
  },
  {
    timestamps: true,
  }
);

const Order = model('Order', orderSchema);

export default Order;
