import { Request, Response, NextFunction } from "express";
import { AppError } from "@/decorators/Error.decorator";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(
      new AppError("Header não informado", 401)
    );
  }
  const [, token] = authHeader.split(" ");

  if(!token){
    return next(
        new AppError("Token não informado", 401)
    )
  }

  next();
};