import { Schema, model } from "mongoose";

const shippingSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Orders",
      required: [true, "Order ID is required."],
    },
    shippingAddress: {
      address: {
        type: String,
        required: [true, "Address Line is required."],
      },
      city: {
        type: String,
        required: [true, "City is required."],
      },
      province: {
        type: String,
        required: [true, "State/Province is required."],
      },
      zipCode: {
        type: Number,
        required: [true, "Zip Code is required."],
      },
      country: {
        type: String,
        required: [true, "Country is required."],
      },
    },
    shippingDate: {
      type: Date,
      required: [true, "Shipping date is required."],
    },
    deliveryDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["Pending", "Shipped", "In Transit", "Delivered", "Cancelled"],
      default: "Pending",
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

const Shipping = model("Shipping", shippingSchema);

export default Shipping;
