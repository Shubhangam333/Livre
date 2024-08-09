import { Router } from "express";
import { multerUpload } from "../middleware/multerMiddleware";
import { processImageUpload } from "../middleware/processImageUpload";
import { authMiddleware, checkAdminRole } from "../middleware/authMiddleware";
import {
  getAllUsers,
  getUserById,
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
router.get("/all/all-users", authMiddleware, checkAdminRole, getAllUsers);
router.get("/get/:userId", authMiddleware, checkAdminRole, getUserById);
export default router;
