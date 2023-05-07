import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";

const verifyAdminUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
};

export default verifyAdminUserMiddleware;
