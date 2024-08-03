import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../middleware/error";
import ErrorHandler from "../utils/helper";
import prisma from "../config/prisma-client";
import { ReviewInput } from "../types/input";

export const createReview = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { comment, userId, productId, rating } = req.body as ReviewInput;

    const review = await prisma.review.create({
      data: {
        comment,
        userId,
        productId,
        rating,
      },
    });

    res.status(201).json({ success: true, review });
  }
);

export const getReviewById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const review = await prisma.review.findUnique({
      where: { id: Number(id) },
    });

    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    res.status(200).json({ success: true, review });
  }
);

export const getAllReviews = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviews = await prisma.review.findMany();

    res.status(200).json({ success: true, reviews });
  }
);

export const updateReviewById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { comment, rating } = req.body;

    const updatedReview = await prisma.review.update({
      where: { id: Number(id) },
      data: {
        comment,
        rating,
      },
    });

    res.status(200).json({ success: true, review: updatedReview });
  }
);

export const deleteReviewById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await prisma.review.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ success: true, message: "Review deleted" });
  }
);
export const getProductReviews = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { productId: Number(productId) },
      include: { user: true },
    });

    res.status(200).json({ success: true, reviews });
  }
);
