import Color from '../models/color.model.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';


export const createColor = asyncHandler(async (request, response, next) => {
  const { colorName } = request.body;

  try {
    const newColor = new Color({ colorName });
    await newColor.save();
    response.status(201).json(newColor);
  } catch (error) {
    next(error);
  }
});

export const getAllColors = asyncHandler(async (request, response, next) => {
  try {
    const colors = await Color.find({ deleted: false });
    response.status(200).json(colors);
  } catch (error) {
    next(error);
  }
});

export const getColorById = asyncHandler(async (request, response, next) => {
  try {
    const color = await Color.findById(request.params.id);
    if (!color || color.deleted) {
      return response.status(404).json({ error: 'Color not found' });
    }
    response.status(200).json(color);
  } catch (error) {
    next(error);
  }
});

export const updateColorById = asyncHandler(async (request, response, next) => {
  const { colorName } = request.body;

  try {
    const color = await Color.findById(request.params.id);
    if (!color || color.deleted) {
      return response.status(404).json({ error: 'Color not found' });
    }

    color.colorName = colorName || color.colorName;
    await color.save();

    response.status(200).json(color);
  } catch (error) {
    next(error);
  }
});

export const softDeleteColorById = asyncHandler(async (request, response, next) => {
  try {
    const color = await Color.findById(request.params.id);
    if (!color) {
      return response.status(404).json({ error: 'Color not found' });
    }

    color.deleted = true;
    await color.save();

    response.status(200).json({ message: 'Color removed successfully' });
  } catch (error) {
    next(error);
  }
});

export const restoreColorById = asyncHandler(async (request, response, next) => {
  try {
    const restoredColor = await Color.findByIdAndUpdate(
      request.params.id,
      { deleted: false },
      { new: true }
    );

    if (!restoredColor) {
      return response.status(404).json({ error: 'Color not found' });
    }

    response.status(200).json({ message: 'Color restored successfully', data: restoredColor });
  } catch (error) {
    next(error);
  }
});
