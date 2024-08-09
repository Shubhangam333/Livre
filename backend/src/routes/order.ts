import express from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  deleteOrderById,
  updateOrderById,
  getUserOrders,
} from "../controllers/order";
import { authMiddleware, checkAdminRole } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/new/create", authMiddleware, createOrder);
router.get("/:id", authMiddleware, getOrderById);
router.get("/all/all-orders", authMiddleware, checkAdminRole, getAllOrders);
router.get("/user/:userId", authMiddleware, getUserOrders);
router.put("/:id", authMiddleware, checkAdminRole, updateOrderById);
router.delete("/:id", authMiddleware, checkAdminRole, deleteOrderById);

export default router;
