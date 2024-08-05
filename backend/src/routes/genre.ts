import express from "express";
import {
  createGenre,
  getGenreById,
  getAllGenres,
  updateGenreById,
  deleteGenreById,
} from "../controllers/genre";
import { authMiddleware, checkAdminRole } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, checkAdminRole, createGenre);
router.get("/:id", authMiddleware, getGenreById);
router.get("/get/all-genre", getAllGenres);
router.put("/:id", authMiddleware, checkAdminRole, updateGenreById);
router.delete("/:id", authMiddleware, checkAdminRole, deleteGenreById);

export default router;
