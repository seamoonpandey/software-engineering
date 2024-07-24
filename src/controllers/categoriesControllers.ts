import asyncHandler from "express-async-handler";
import Category from "../models/category";

// @desc   Get all categories
// @route  GET /api/categories
// @access Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// @desc   Add a category
// @route  POST /api/categories
// @access Private/Admin
const addCategory = asyncHandler(async (req, res) => {
  const { name, image } = req.body;

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({ name, image });

  if (category) {
    res.status(201).json(category);
  } else {
    res.status(400);
    throw new Error("Invalid category data");
  }
});

// @desc  Get a category by ID
// @route GET /api/categories/:id
// @access Public
// const getCategoryById = asyncHandler(async (req, res) => {
//   const items = await IItem.find({ category: req.params.id });
//   res.json(items);
// });

export { getCategories, addCategory };
