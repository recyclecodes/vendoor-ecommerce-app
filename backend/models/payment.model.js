import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    chargeId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['succeeded', 'pending', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Payment = model('Payment', paymentSchema);

export default Payment;
