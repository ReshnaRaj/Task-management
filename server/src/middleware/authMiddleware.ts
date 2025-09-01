import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../constants/status.constants";
import { Messages } from "../constants/message.constants";
import { IUser } from "../models/user.model";
import { HttpError, createHttpError } from "../utils/http.errors";
import { env } from "../config/env.config";
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "admin" | "user";
  };
}
export const authAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
 
  const authHeader = req.headers.authorization;
  console.log(authHeader,"auth headers")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      createHttpError(HttpStatus.UNAUTHORIZED, Messages.NOT_AUTHORIZED)
    );
  }
  const token = authHeader.split(" ")[1];
  console.log(token,"tokensss")
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string) as {
      id: string;
      role: "admin" | "user";
    };
    console.log(decoded,"decodeddd")
    
    if (decoded.role !== "admin") {
      return next(createHttpError(HttpStatus.FORBIDDEN, "Admin access only"));
    }
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return next(
      createHttpError(HttpStatus.UNAUTHORIZED, Messages.NOT_AUTHORIZED)
    );
  }
};
export const authUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      createHttpError(HttpStatus.UNAUTHORIZED, Messages.NOT_AUTHORIZED)
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as string) as {
      id: string;
      role: "admin" | "user";
    };

    if (decoded.role !== "user") {
      return next(createHttpError(HttpStatus.FORBIDDEN, "User access only"));
    }

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return next(
      createHttpError(HttpStatus.UNAUTHORIZED, Messages.NOT_AUTHORIZED)
    );
  }
};
