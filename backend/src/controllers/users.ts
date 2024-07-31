import { TryCatch } from "../middleware/error";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/helper";

export const profile = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      id: req.user.id,
      role: req.user.role,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    });
  }
);
