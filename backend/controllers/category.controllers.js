import Category from '../models/category.model.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';

export const createCategory = asyncHandler(async (request, response, next) => {
  try {
    const { categoryName } = request.body;

    const newCategory = new Category({
      categoryName,
    });

    await newCategory.save();
    response.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

export const getAllCategories = asyncHandler(
  async (request, response, next) => {
    try {
      const categories = await Category.find({ deleted: false });
      response.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
);

export const getCategoryById = asyncHandler(async (request, response, next) => {
  try {
    const category = await Category.findById(request.params.id);
    if (!category || category.deleted) {
      return response.status(404).json({ error: 'Category not found' });
    }
    response.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

export const updateCategoryById = asyncHandler(
  async (request, response, next) => {
    try {
      const { categoryName } = request.body;

      const updatedCategory = await Category.findByIdAndUpdate(
        request.params.id,
        { categoryName },
        { new: true }
      );

      if (!updatedCategory || updatedCategory.deleted) {
        return response.status(404).json({ error: 'Category not found' });
      }

      response.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);

export const softDeleteCategoryById = asyncHandler(
  async (request, response, next) => {
    try {
      const deletedCategory = await Category.findByIdAndUpdate(
        request.params.id,
        { deleted: true },
        { new: true }
      );

      if (!deletedCategory) {
        return response.status(404).json({ error: 'Category not found' });
      }

      response.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

export const restoreCategoryById = asyncHandler(
  async (request, response, next) => {
    try {
      const restoredCategory = await Category.findByIdAndUpdate(
        request.params.id,
        { deleted: false },
        { new: true }
      );

      if (!restoredCategory) {
        return response.status(404).json({ error: 'Category not found' });
      }

      response.status(200).json({ message: 'Category restored successfully' });
    } catch (error) {
      next(error);
    }
  }
);
