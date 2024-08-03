import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/helper";
import { ControllerType } from "../types/types";

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;
  console.log(err);
  if (err.name === "CastError") err.message = "Invalid ID";
  if (err.name === "PrismaClientKnownRequestError") {
    err.message = "Prisma Error";
  }

  if (err.name == "TokenExpiredError") {
    err.statusCode = 401;
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const TryCatch =
  (func: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
