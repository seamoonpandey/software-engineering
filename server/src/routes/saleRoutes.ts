import express from "express";
import {
  createTransaction,
  listUserTransactions,
} from "../controllers/transactionController";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/", protect, listUserTransactions);

export default router;
