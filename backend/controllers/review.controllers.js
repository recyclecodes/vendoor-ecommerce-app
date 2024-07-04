import Review from "../models/review.model.js";
import User from "../models/auth.model.js";
import Product from "../models/product.model.js";
import { asyncHandler } from "../middlewares/error.middlewares.js";

const createReview = asyncHandler(async (request, response) => {
  try {
    const { userId, productId, rating, comments } = request.body;
    const user = await User.findOne({ _id: userId });
    const product = await Product.findOne({ _id: productId });

    if (!user || !product) {
      response.status(404).send({ message: "Not Found." });
    } else {
      const newReview = new Review({
        userId,
        productId,
        rating,
        comments,
      });

      await newReview.save();

      response.status(201).send({
        message: `Review create on product with id ${productId} `,
        data: newReview,
      });
    }
  } catch (error) {
    response.status(response.statusCode).send({ message: error.message });
  }
});

const getAllReviews = asyncHandler(async (request, response) => {
  try {
    const reviews = await Review.find()
      .select(["-updatedAt"])
      .sort({ createdAt: -1 })
      .populate({ path: "userId", select: "fullname" })
      .populate({ path: "productId", select: "productName description price image" });

    response.status(200).send({
      message: "List of All Reviews",
      data: reviews,
    });
  } catch (error) {
    response.status(response.statusCode).send({ message: error.message });
  }
});

const getReviewById = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;

    const reviews = await Review.findById({ _id: id })
      .select(["-updatedAt"])
      .sort({ createdAt: -1 })
      .populate({ path: "userId", select: "fullname" })
      .populate({ path: "productId", select: "productName description price image" });

    response.status(200).send({
      message: "Reviews by Id",
      data: reviews,
    });
  } catch (error) {
    response.status(response.statusCode).send({ message: error.message });
  }
});

const updateReviewById = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const { rating, comments } = request.body;
    const updatedReview = await Review.findByIdAndUpdate(
      { _id: id },
      {
        rating,
        comments,
      },
      { new: true }
    );

    if (!updatedReview || updatedReview.deleted) {
      return response.status(404).send({ error: "Review not found!" });
    }

    response
      .status(200)
      .send({
        message: "Review was updated successfully",
        data: updatedReview,
      });
  } catch (error) {
    response.status(response.statusCode).send({ message: error.message });
  }
});

const softDeleteReviewById = asyncHandler(async (request, response) => {
  try {
    const deletedReview = await Review.findByIdAndUpdate(
      request.params.id,
      { deleted: true },
      { new: true }
    );

    if (!deletedReview) {
      return response.status(404).send({ error: "Review not found" });
    }

    response
      .status(200)
      .send({ message: "Review deleted successfully!", data: deletedReview });
  } catch (error) {
    response.status(response.statusCode).send({ message: error.message });
  }
});

const deleteReviewById = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;

    const { deletedCount } = await Review.deleteOne({ _id: id });

    if (!deletedCount) {
      response.status(500).send({ message: "Something went wrong." });
    }
    response.status(200).send({ message: "Review was successfully deleted. " });
  } catch (error) {
    response.status(response.statusCode).send({ message: error.message });
  }
});

const restoreReviewById = asyncHandler(async (request, response) => {
  try {
    const restoredReview = await Review.findByIdAndUpdate(
      request.params.id,
      { deleted: false },
      { new: true }
    );

    if (!restoredReview) {
      return response.status(404).send({ error: "Review not found" });
    }

    response
      .status(200)
      .send({ message: "Review restored successfully!", data: restoredReview });
  } catch (error) {
    response.status(response.statusCode).send({ message: error.message });
  }
});

export {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  softDeleteReviewById,
  deleteReviewById,
  restoreReviewById,
};
