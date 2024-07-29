import { TryCatch } from "../middleware/error";
import { NextFunction, Request, Response } from "express";

export const profile = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      profile: {
        id: req.user.id,
        role: req.user.role,
        name: req.user.name,
        email: req.user.email,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      },
    });
  }
);
