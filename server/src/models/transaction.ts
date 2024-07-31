import { Schema, model, Model, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  _id: Types.ObjectId;
  buyerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  paymentStatus: string;
  itemId: Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Transaction: Model<ITransaction> = model<ITransaction>(
  "Transaction",
  transactionSchema,
);
export default Transaction;
