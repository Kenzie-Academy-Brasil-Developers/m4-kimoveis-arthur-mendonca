import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

const verifyAdminUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIsAdmin = res.locals.admin;
  console.log(userIsAdmin);
  if (!userIsAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default verifyAdminUserMiddleware;
