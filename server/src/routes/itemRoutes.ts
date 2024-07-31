import { Router } from "express";
import {
  createItem,
  deleteItem,
  getFeaturedItems,
  getItemById,
  getItems,
  getItemsByCategory,
  getItemsByUser,
  updateItem,
} from "../controllers/itemsController";
import protect from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createItem);
router.get("/", getItems);
router.get("/featured", getFeaturedItems);
router.get("/user/:userId", getItemsByUser);
router.get("/category/:categoryId", getItemsByCategory);
router.get("/:id", getItemById);
router.put("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);

export default router;
