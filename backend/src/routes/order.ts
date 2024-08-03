import express from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  deleteOrderById,
  updateOrderById,
} from "../controllers/order";
import { authMiddleware, checkAdminRole } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/:id", authMiddleware, getOrderById);
router.get("/", authMiddleware, checkAdminRole, getAllOrders);
router.put("/:id", authMiddleware, checkAdminRole, updateOrderById);
router.delete("/:id", authMiddleware, checkAdminRole, deleteOrderById);

export default router;
