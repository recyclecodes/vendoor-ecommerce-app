import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Category name is required"],
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

const Category = model("Category", categorySchema);

export default Category;
