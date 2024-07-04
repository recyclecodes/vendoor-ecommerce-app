import { Router } from "express";
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  softDeleteReviewById,
  deleteReviewById,
  restoreReviewById,
} from "../controllers/review.controllers.js";

import { uploadSingleFile } from "../middlewares/upload.middleware.js";

const reviewRouter = Router();

reviewRouter.post("/", uploadSingleFile, createReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:id", getReviewById);
reviewRouter.put("/update/:id", uploadSingleFile, updateReviewById);
reviewRouter.put("/restore/:id", restoreReviewById);
reviewRouter.delete("/delete/:id", softDeleteReviewById);
reviewRouter.delete("/:id", deleteReviewById);

export default reviewRouter;
