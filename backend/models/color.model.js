import { Schema, model } from 'mongoose';

const colorSchema = new Schema(
  {
    colorName: {
      type: String,
      required: [true, 'Color name is required'],
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

const Color = model('Color', colorSchema);

export default Color;
