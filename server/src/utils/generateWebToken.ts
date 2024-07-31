import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (res: Response, userId: string): void => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // This is correct
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Correct values here
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
