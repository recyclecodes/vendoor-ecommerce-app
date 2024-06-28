import Product from '../models/product.model.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';
import { cloudinary } from '../config/storage.js';
import Size from '../models/size.model.js';
import Color from '../models/color.model.js';
import Category from '../models/category.model.js';

export const createProduct = asyncHandler(async (request, response, next) => {
  const { productName, description, price, stock, category, size, color } =
    request.body;
  const { path, filename } = request.file;

  if (
    !productName ||
    !description ||
    !price ||
    !stock ||
    !category ||
    !size ||
    !color ||
    !path ||
    !filename
  ) {
    return response.status(400).json({
      error:
        'All fields (productName, description, price, stock, category, size, color) and image are required',
    });
  }

  try {
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return response.status(404).json({ error: 'Category not found' });
    }

    const sizeDoc = await Size.findById(size);
    if (!sizeDoc) {
      return response.status(404).json({ error: 'Size not found' });
    }

    const colorDoc = await Color.findById(color);
    if (!colorDoc) {
      return response.status(404).json({ error: 'Color not found' });
    }

    const newProduct = new Product({
      productName,
      description,
      price,
      stock,
      category: categoryDoc._id,
      size: sizeDoc._id,
      color: colorDoc._id,
      image: {
        path,
        filename,
      },
    });

    await newProduct.save();

    const populatedProduct = await Product.findById(newProduct._id)
      .populate('category', 'categoryName')
      .populate('size', 'sizeName')
      .populate('color', 'colorName')
      .exec();

    response.status(201).json(populatedProduct);
  } catch (error) {
    next(error);
  }
});

export const getAllProducts = asyncHandler(async (request, response, next) => {
  try {
    const { page = 1, limit, category, size, color } = request.query;
    const filter = { deleted: false };

    if (category) {
      const categoryDoc = await Category.findOne({ categoryName: category });
      if (!categoryDoc) {
        return response.status(404).json({ error: 'Category not found' });
      }
      filter.category = categoryDoc._id;
    }

    if (size) {
      const sizeDoc = await Size.findOne({ sizeName: size });
      if (!sizeDoc) {
        return response.status(404).json({ error: 'Size not found' });
      }
      filter.size = sizeDoc._id;
    }

    if (color) {
      const colorDoc = await Color.findOne({ colorName: color });
      if (!colorDoc) {
        return response.status(404).json({ error: 'Color not found' });
      }
      filter.color = colorDoc._id;
    }

    const options = {
      page: parseInt(page, 10),
      select: '-updatedAt',
      sort: { createdAt: -1 },
    };

    if (limit) {
      options.limit = parseInt(limit, 10);
    }

    const products = limit
      ? await Product.paginate(filter, options)
      : await Product.find(filter).select(options.select).sort(options.sort);

    response.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

export const getProductById = asyncHandler(async (request, response, next) => {
  try {
    const { id } = request.params;
    const product = await Product.findById(id)
      .select('-updatedAt')
      .populate('category size color');

    if (!product || product.deleted) {
      return response.status(404).json({ error: 'Product not found' });
    }

    response.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

export const updateProductById = asyncHandler(
  async (request, response, next) => {
    const { productName, description, price, stock, category, size, color } =
      request.body;

    try {
      const product = await Product.findById(request.params.id);

      if (!product || product.deleted) {
        return response.status(404).json({ error: 'Product not found' });
      }

      if (request.file) {
        await cloudinary.uploader.destroy(product.image.filename);
      }

      const updatedData = {
        productName: productName || product.productName,
        description: description || product.description,
        price: price || product.price,
        stock: stock || product.stock,
        category: category || product.category,
        size: size || product.size,
        color: color || product.color,
        image: {
          path: request.file.path,
          filename: request.file.filename,
        },
      };

      const updatedProduct = await Product.findByIdAndUpdate(
        request.params.id,
        updatedData,
        { new: true }
      );

      if (!updatedProduct) {
        return response.status(404).json({ error: 'Product update failed' });
      }

      response.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }
);

export const softDeleteProductById = asyncHandler(
  async (request, response, next) => {
    try {
      const { id } = request.params;

      const product = await Product.findByIdAndUpdate(
        id,
        { deleted: true },
        { new: true }
      );

      if (!product) {
        return response.status(404).json({ error: 'Product not found' });
      }

      response
        .status(200)
        .json({ message: 'Product removed successfully', product });
    } catch (error) {
      next(error);
    }
  }
);

export const restoreProductById = asyncHandler(
  async (request, response, next) => {
    try {
      const restoredProduct = await Product.findByIdAndUpdate(
        request.params.id,
        { deleted: false },
        { new: true }
      );

      if (!restoredProduct) {
        return response.status(404).json({ error: 'Product not found' });
      }

      response
        .status(200)
        .json({ message: 'Product restored successfully', restoredProduct });
    } catch (error) {
      next(error);
    }
  }
);
