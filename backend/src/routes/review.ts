import express from "express";
import {
  createReview,
  getReviewById,
  getAllReviews,
  deleteReviewById,
  updateReviewById,
  getProductReviews,
} from "../controllers/review";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/new/create", authMiddleware, createReview);
router.get("/:id", authMiddleware, getReviewById);
router.get("/", authMiddleware, getAllReviews);
router.put("/:id", authMiddleware, updateReviewById);
router.delete("/:id", authMiddleware, deleteReviewById);
router.get("/product/:productId", authMiddleware, getProductReviews);

export default router;
