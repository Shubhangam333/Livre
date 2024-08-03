import { RequestHandler } from "express";
import * as yup from "yup";
import ErrorHandler from "../utils/helper";

export const validate = (schema: yup.Schema): RequestHandler => {
  return async (req, res, next) => {
    try {
      await schema.validate(
        { ...req.body },
        { strict: true, abortEarly: true }
      );
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        next(new ErrorHandler(error.message, 404));
      } else {
        next(new ErrorHandler("Validation Failed", 404));
      }
    }
  };
};
export const productValidate = (schema: yup.Schema): RequestHandler => {
  return async (req, res, next) => {
    try {
      await schema.validate({ ...req.body }, { abortEarly: true });
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        next(new ErrorHandler(error.message, 404));
      } else {
        next(new ErrorHandler("Validation Failed", 404));
      }
    }
  };
};
