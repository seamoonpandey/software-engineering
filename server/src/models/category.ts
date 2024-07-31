import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  image: string;
}

const categorySchema: Schema<ICategory> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  categorySchema,
);
export default Category;
