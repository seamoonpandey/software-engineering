import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user";

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const protect = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || "",
        ) as jwt.JwtPayload;

        req.user = (await User.findById(decoded.userId).select(
          "-password",
        )) as IUser;

        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  },
);

const admin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export default protect;
export { admin };
