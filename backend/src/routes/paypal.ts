// routes.js
import express from "express";
import { verifyPayment } from "../controllers/paypal";

const router = express.Router();

router.post("/verify-payment", verifyPayment);

export default router;
