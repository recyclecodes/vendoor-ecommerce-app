import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Product price must be a positive number'],
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      min: [0, 'Product stock must be a positive number'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required'],
    },
    size: {
      type: Schema.Types.ObjectId,
      ref: 'Size',
      required: [true, 'Product size is required'],
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: 'Color',
      required: [true, 'Product color is required'],
    },
    image: {
      path: {
        type: String,
        required: [true, 'Image path is required.'],
      },
      filename: {
        type: String,
        required: [true, 'Image filename is required.'],
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

const Product = model('Product', productSchema);

export default Product;
