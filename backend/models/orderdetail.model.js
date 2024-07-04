import { Schema, model } from "mongoose";

const orderDetailSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Orders",
      required: [true, "Order ID is required."],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total Amount is required."],
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

const OrderDetail = model("Order Details", orderDetailSchema);

export default OrderDetail;
