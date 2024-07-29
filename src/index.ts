import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import categoryRoutes from "./routes/categoryRoutes";
import itemRoutes from "./routes/itemRoutes";
import saleRoutes from "./routes/saleRoutes";

dotenv.config();

const app: Express = express();
const upload = multer();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(upload.array("fieldName"));
app.use(express.json());

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("api/category", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/transactions", saleRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Ts Server");
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {});
