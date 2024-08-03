import { Router } from "express";
import { multerUpload } from "../middleware/multerMiddleware";
import { processImageUpload } from "../middleware/processImageUpload";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getUserOrders,
  profile,
  updateAvatar,
  updateUser,
} from "../controllers/users";

const router = Router();
router.put(
  "/update-avatar",
  authMiddleware,
  multerUpload.single("avatar"),
  processImageUpload,
  updateAvatar
);
router.put("/update-profile", authMiddleware, updateUser);
router.get("/profile", authMiddleware, profile);
router.get("/orders", authMiddleware, getUserOrders);
export default router;
