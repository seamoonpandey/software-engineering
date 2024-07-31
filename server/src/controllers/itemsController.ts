import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Item from "../models/item";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

const createItem = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { name, image, price, available, featured, description, categoryId } =
      req.body;

    const item = new Item({
      name,
      image,
      price,
      available,
      featured,
      description,
      categoryId,
      userId: req.user?._id,
    });

    const savedItem = await item.save();
    res.status(201).json(savedItem);
  },
);

const getItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await Item.find().populate("categoryId userId");
  res.status(200).json(items);
});

const getItemById = asyncHandler(async (req: Request, res: Response) => {
  const item = await Item.findById(req.params.id).populate("categoryId userId");
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.status(200).json(item);
});

const updateItem = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    if (item.userId.toString() !== req.user!._id.toString()) {
      res.status(401).json({ error: "User not authorized" });
      return;
    }

    Object.assign(item, req.body);
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  },
);

const deleteItem = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }
    if (item.userId.toString() !== req.user!._id.toString()) {
      res.status(401).json({ error: "User not authorized" });
      return;
    }

    await item.deleteOne();
    res.status(200).json({ message: "Item deleted successfully" });
  },
);
const getItemsByUser = asyncHandler(async (req: Request, res: Response) => {
  const items = await Item.find({ userId: req.params.userId }).populate(
    "categoryId userId",
  );
  res.status(200).json(items);
});

const getFeaturedItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await Item.find({ featured: true }).populate(
    "categoryId userId",
  );
  res.status(200).json(items);
});

const getItemsByCategory = asyncHandler(async (req: Request, res: Response) => {
  const items = await Item.find({
    categoryId: req.params.categoryId,
  }).populate("categoryId userId");
  res.status(200).json(items);
});

export {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemsByUser,
  getFeaturedItems,
  getItemsByCategory,
};
