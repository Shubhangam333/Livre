import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middleware/error";
import ErrorHandler from "../utils/helper";
import prisma from "../config/prisma-client";

// Create Address
export const createAddress = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { street, city, state, zipCode, country } = req.body;

    if (!street || !city || !state || !zipCode || !country) {
      return next(new ErrorHandler("All address fields are required", 400));
    }

    const address = await prisma.address.create({
      data: {
        street,
        city,
        state,
        zipCode,
        country,
      },
    });

    res.status(201).json({ success: true, message: "Address created" });
  }
);

// Update Address
export const updateAddress = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { street, city, state, zipCode, country } = req.body;

    const address = await prisma.address.findUnique({
      where: { id: Number(id) },
    });

    if (!address) {
      return next(new ErrorHandler("Address not found", 404));
    }

    const updatedAddress = await prisma.address.update({
      where: { id: Number(id) },
      data: {
        street: street || address.street,
        city: city || address.city,
        state: state || address.state,
        zipCode: zipCode || address.zipCode,
        country: country || address.country,
      },
    });

    res.status(200).json({ success: true, data: updatedAddress });
  }
);

// Delete Address
export const deleteAddress = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const address = await prisma.address.findUnique({
      where: { id: Number(id) },
    });

    if (!address) {
      return next(new ErrorHandler("Address not found", 404));
    }

    await prisma.address.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ success: true, message: "Address deleted" });
  }
);

// Get Addresses
export const getAddresses = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const addresses = await prisma.address.findMany();
    res.status(200).json({ success: true, addresses });
  }
);
