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

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }
    response.locals.admin = decoded.admin;
    response.locals.id = decoded.sub;
  });

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const getLoggedUser = await userRepo.findOneBy({
    id: response.locals.id,
  });

  // if (!getLoggedUser) {
  //   throw new AppError("invalid signature", 401);
  // }

  // const admin = getLoggedUser!.admin;
  // response.locals.admin = admin;

  const IdNumberFromUser = getLoggedUser!.id;
  response.locals.id = IdNumberFromUser;

  // Se eu retirar as linhas 39,40, 42 e 43, os testes de UPDATE abaixo não passam. Por quê?
  // Success: User must be able to self update - User token - Full body (102 ms)
  // × Success: User must not be able to update 'admin' field - Admin token - Partial (16 ms)

  // const activeUser = getLoggedUser.deletedAt;
  // response.locals.activeUser = activeUser;

  return next();
};

export default verifyTokenMiddleware;
