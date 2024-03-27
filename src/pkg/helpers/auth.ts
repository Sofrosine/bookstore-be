import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { CustomResponse } from "./response";

// Define a new interface that extends Request type to include user property
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const AuthenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the JWT token from the request headers or query parameters
  const token = req.headers.authorization?.split(" ")[1] || req.query.token;

  if (!token) {
    return CustomResponse(res, {
      code: 401,
      message: "Authentication failed: Token not provided",
      data: null,
    });
  }

  try {
    // Verify the token and extract claims
    const decoded = jwt.verify(String(token), JWT_SECRET) as JwtPayload;
    req["user"] = decoded; // Add claims to request object

    next(); // Move to the next middleware or route handler
  } catch (error) {
    return CustomResponse(res, {
      code: 401,
      message: "Authentication failed: Invalid token",
      data: null,
    });
  }
};

export const EncryptPassword = async (text: string): Promise<string> => {
  try {
    const hash = await bcrypt.hash(text, 10); // Using bcrypt with a salt round of 10
    return hash;
  } catch (error) {
    throw new Error("Error encrypting password");
  }
};

export const ComparePassword = async (
  hashedPassword: string,
  plainPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};
