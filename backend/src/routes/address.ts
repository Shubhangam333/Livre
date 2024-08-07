import express from "express";
import {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
} from "../controllers/address";

const router = express.Router();

router.post("/new/create", createAddress);
router.get("/addresses", getAddresses);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;
