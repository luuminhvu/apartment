import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/verifyToken";
import { ErrorResponse, UnauthorizedResponse } from "../components/Response";
import { AUTH_CONTANTS } from "../common/contants/auth";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return UnauthorizedResponse(res, AUTH_CONTANTS.MISSING_TOKEN);
    }
    const decoded = verifyToken(token.split(" ")[1]);
    if (!decoded) {
      return UnauthorizedResponse(res, AUTH_CONTANTS.INVALID_TOKEN);
    }
    next();
  } catch (error: any) {
    return ErrorResponse(res, error);
  }
};
