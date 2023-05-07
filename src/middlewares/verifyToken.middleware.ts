import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

const verifyTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = request.headers.authorization;
  let userId: number = 0;

  if (!token) {
    return response.status(401).json({ message: "Missing bearer token" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }

    userId = decoded.sub;
  });

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const getLoggedUser = await userRepo.findOneBy({
    id: userId,
  });

  if (!getLoggedUser) {
    throw new AppError("invalid signature", 401);
  }

  const admin = getLoggedUser.admin;
  response.locals.admin = admin;

  const IdNumberFromUser = getLoggedUser.id;
  response.locals.id = IdNumberFromUser;

  const activeUser = getLoggedUser.deletedAt;
  response.locals.activeUser = activeUser;

  return next();
};

export default verifyTokenMiddleware;
