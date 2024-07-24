import express from "express";
import {
  getCategories,
  addCategory,
} from "../controllers/categoriesControllers";
import protect, { admin } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(getCategories).post(protect, admin, addCategory);

// router.get("/:id", getCategoryById);

export default router;
