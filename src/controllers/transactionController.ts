import { Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Transaction from "../models/transaction";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import User from "../models/user";
import Item from "../models/item";

const createTransaction = expressAsyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { sellerId, buyerId, itemId } = req.body;

    if (!sellerId || !buyerId || !itemId) {
      res.status(400);
      throw new Error("Please provide sellerId, buyerId, and itemId");
    }

    const seller = await User.findById(sellerId);
    if (!seller) {
      res.status(404);
      throw new Error("Seller not found");
    }

    const buyer = await User.findById(buyerId);
    if (!buyer) {
      res.status(404);
      throw new Error("Buyer not found");
    }

    const item = await Item.findById(itemId);
    if (!item) {
      res.status(404);
      throw new Error("Item not found");
    }

    const transaction = new Transaction({
      seller: sellerId,
      buyer: buyerId,
      item: itemId,
    });

    const createdTransaction = await transaction.save();

    res.status(201).json(createdTransaction);
  },
);

const listUserTransactions = expressAsyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!._id;

    const transactions = await Transaction.find({
      $or: [{ seller: userId }, { buyer: userId }],
    });

    res.status(200).json(transactions);
  },
);

export { createTransaction, listUserTransactions };
