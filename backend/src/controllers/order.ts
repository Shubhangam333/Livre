import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../middleware/error";
import ErrorHandler from "../utils/helper";
import prisma from "../config/prisma-client";
import { OrderInput } from "../types/input";

export const createOrder = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      userId,
      totalAmount,
      paymentStatus,
      paymentType,
      couponCode,
      couponValue,
      addressId,
      items,
      orderStatus,
    } = req.body as OrderInput;

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        paymentStatus,
        paymentType,
        couponCode,
        couponValue,
        addressId,
        items: {
          create: items,
        },
        orderStatus: {
          create: orderStatus,
        },
      },
    });

    res.status(201).json({ success: true, order });
  }
);

export const getOrderById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: { items: true, orderStatus: true, address: true },
    });

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({ success: true, order });
  }
);

export const getAllOrders = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await prisma.order.findMany({
      include: { items: true, orderStatus: true, address: true },
    });

    res.status(200).json({ success: true, orders });
  }
);

export const updateOrderById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const {
      totalAmount,
      paymentStatus,
      paymentType,
      couponCode,
      couponValue,
      addressId,
      items,
      orderStatus,
    } = req.body;

    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        totalAmount,
        paymentStatus,
        paymentType,
        couponCode,
        couponValue,
        addressId,
        items: {
          deleteMany: {},
          create: items,
        },
        orderStatus: {
          deleteMany: {},
          create: orderStatus,
        },
      },
    });

    res.status(200).json({ success: true, order: updatedOrder });
  }
);

export const deleteOrderById = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await prisma.order.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ success: true, message: "Order deleted" });
  }
);

export const getUserOrders = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.userId);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [orders, totalOrders] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        skip,
        take: limit,
        select: {
          id: true,
          totalAmount: true,
          paymentStatus: true,
          createdAt: true,
        },
      }),
      prisma.order.count({
        where: { userId },
      }),
    ]);

    res.status(200).json({
      success: true,
      orders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
    });
  }
);
