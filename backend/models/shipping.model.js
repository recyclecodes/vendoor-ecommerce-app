import { Schema, model } from 'mongoose';

const shippingSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'],
      default: 'Pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Shipping = model('Shipping', shippingSchema);

export default Shipping;
