import { Schema, model, Model, Document, Types } from "mongoose";

export interface IItem extends Document {
  _id: Types.ObjectId;
  name: string;
  image: string;
  price: number;
  available: boolean;
  featured: boolean;
  description: string;
  categoryId: Types.ObjectId;
  userId: Types.ObjectId;
}

const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, required: true },
    featured: { type: Boolean, required: true },
    description: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

const Item: Model<IItem> = model<IItem>("Item", itemSchema);

export default Item;
