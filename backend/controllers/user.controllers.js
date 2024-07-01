import User from '../models/auth.model.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';
import { cloudinary } from '../config/storage.js';
import bcrypt from 'bcrypt';

export const getAllUsers = asyncHandler(async (request, response, next) => {
  try {
    const { page = 1, limit = 10, search } = request.query;
    const filter = { deleted: false };

    if (search) {
      filter.$or = [
        { fullname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      select: '-password -confirmationCode',
      sort: { createdAt: -1 },
    };

    const users = await User.paginate(filter, options);

    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export const getUserById = asyncHandler(async (request, response) => {
  try {
    const user = await User.findById(request.params.id).select(
      '-password -confirmationCode'
    );
    if (!user || user.deleted) {
      return response.status(404).json({ message: 'User not found' });
    }

    if (
      request.user.role !== 'admin' &&
      request.user._id.toString() !== user._id.toString()
    ) {
      return response.status(403).json({ message: 'Access denied' });
    }

    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

export const getCurrentUser = asyncHandler(async (request, response) => {
  try {
    const user = await User.findById(request.user._id).select(
      '-password -confirmationCode'
    );
    if (!user || user.deleted) {
      return response.status(404).json({ message: 'User not found' });
    }
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

export const updateUserProfile = asyncHandler(async (request, response) => {
  try {
    const { fullname, address, phoneNumber, currentPassword, newPassword } =
      request.body;

    const user = await User.findById(request.user._id);
    if (!user || user.deleted) {
      return response.status(404).json({ message: 'User not found' });
    }

    if (request.file && user.image) {
      await cloudinary.uploader.destroy(user.image.filename);
    }

    user.fullname = fullname || user.fullname;
    user.address = address || user.address;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    if (request.file) {
      user.image = { path: request.file.path, filename: request.file.filename };
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return response
          .status(400)
          .json({ message: 'Current password is incorrect' });
      }
      user.password = newPassword;
    }

    await user.save();

    response.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

export const updateUserById = asyncHandler(async (request, response) => {
  try {
    const { fullname, address, phoneNumber, role, confirmed, deleted } =
      request.body;

    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    if (
      request.user.role !== 'admin' &&
      request.user._id.toString() !== user._id.toString()
    ) {
      return response.status(403).json({ message: 'Access denied' });
    }

    if (request.file && user.image) {
      await cloudinary.uploader.destroy(user.image.filename);
    }

    user.fullname = fullname || user.fullname;
    user.address = address || user.address;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.role = role || user.role;
    user.confirmed = confirmed !== undefined ? confirmed : user.confirmed;
    user.deleted = deleted !== undefined ? deleted : user.deleted;
    if (request.file) {
      user.image = { path: request.file.path, filename: request.file.filename };
    }

    await user.save();

    response.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

export const deleteUserAccountById = asyncHandler(async (request, response) => {
  try {
    const deletedUser = await User.findByIdAndUpdate(
      request.params.id,
      { deleted: true },
      { new: true }
    );

    if (!deletedUser || deletedUser.deleted === false) {
      return response.status(404).json({ message: 'User not found' });
    }

    response
      .status(200)
      .json({ message: 'Account deleted successfully', user: deletedUser });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

export const restoreUserAccountById = asyncHandler(
  async (request, response) => {
    try {
      const restoredUser = await User.findByIdAndUpdate(
        request.params.id,
        { deleted: false },
        { new: true }
      );

      if (!restoredUser || restoredUser.deleted === true) {
        return response
          .status(404)
          .json({ message: 'User not found or not deleted' });
      }

      response
        .status(200)
        .json({ message: 'Account restored successfully', user: restoredUser });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
);
