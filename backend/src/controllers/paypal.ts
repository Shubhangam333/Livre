// paypalController.js
import paypal from "@paypal/checkout-server-sdk";
import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../middleware/error";
import ErrorHandler from "../utils/helper";

const Environment = paypal.core.SandboxEnvironment;
const client = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID || "",
    process.env.PAYPAL_CLIENT_SECRET || ""
  )
);

export const verifyPayment = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderID } = req.body;

    const request = new paypal.orders.OrdersGetRequest(orderID);
    const order = await client.execute(request);

    if (order.result.status !== "COMPLETED") {
      return next(new ErrorHandler("Payment not completed", 400));
    }

    res.status(200).json({ success: true, order });
  }
);
