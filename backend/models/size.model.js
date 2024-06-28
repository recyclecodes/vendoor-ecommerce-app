import { Schema, model } from 'mongoose';

const sizeSchema = new Schema(
  {
    sizeName: {
      type: String,
      required: [true, 'Size name is required'],
      trim: true,
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

const Size = model('Size', sizeSchema);

export default Size;
