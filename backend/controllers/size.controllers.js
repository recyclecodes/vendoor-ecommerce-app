import Size from '../models/size.model.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';

export const createSize = asyncHandler(async (request, response, next) => {
  try {
    const { sizeName } = request.body;

    const newSize = new Size({
      sizeName,
    });

    await newSize.save();
    response.status(201).json(newSize);
  } catch (error) {
    next(error);
  }
});

export const getAllSizes = asyncHandler(async (request, response, next) => {
  try {
    const sizes = await Size.find({ deleted: false });
    response.status(200).json(sizes);
  } catch (error) {
    next(error);
  }
});

export const getSizeById = asyncHandler(async (request, response, next) => {
  try {
    const size = await Size.findById(request.params.id);
    if (!size || size.deleted) {
      return response.status(404).json({ error: 'Size not found' });
    }
    response.status(200).json(size);
  } catch (error) {
    next(error);
  }
});

export const updateSizeById = asyncHandler(async (request, response, next) => {
  try {
    const { sizeName } = request.body;

    const updatedSize = await Size.findByIdAndUpdate(
      request.params.id,
      { sizeName },
      { new: true }
    );

    if (!updatedSize || updatedSize.deleted) {
      return response.status(404).json({ error: 'Size not found' });
    }

    response.status(200).json(updatedSize);
  } catch (error) {
    next(error);
  }
});

export const softDeleteSizeById = asyncHandler(
  async (request, response, next) => {
    try {
      const deletedSize = await Size.findByIdAndUpdate(
        request.params.id,
        { deleted: true },
        { new: true }
      );

      if (!deletedSize) {
        return response.status(404).json({ error: 'Size not found' });
      }

      response.status(200).json({ message: 'Size soft deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

export const restoreSizeById = asyncHandler(async (request, response, next) => {
  try {
    const restoredSize = await Size.findByIdAndUpdate(
      request.params.id,
      { deleted: false },
      { new: true }
    );

    if (!restoredSize) {
      return response.status(404).json({ error: 'Size not found' });
    }

    response.status(200).json({ message: 'Size restored successfully' });
  } catch (error) {
    next(error);
  }
});
