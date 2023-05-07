import { NextFunction, Request, Response } from "express";
import { TuserCreationDataInterface } from "../interfaces/users.interfaces";
import {
  createUserService,
  listAllUsersService,
  updateUserService,
} from "../services/users.service";
import { returnAllUsersResponseSchema } from "../schemas/users.schemas";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: TuserCreationDataInterface = request.body;

  const newUser = await createUserService(userData);

  return response.status(201).json(newUser);
};

const listAllUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userIsAdmin = response.locals.admin;

  const users = await listAllUsersService(userIsAdmin);

  return response.status(200).json(users);
};

const updateUserController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.id;
  const userData = request.body;
  const idFromToken = response.locals.id;
  const userIsAdmin = response.locals.admin;

  const user = await updateUserService(
    Number(userId),
    idFromToken,
    userData,
    userIsAdmin
  );

  return response.status(200).json(user);
};

export { createUserController, listAllUsersController, updateUserController };
