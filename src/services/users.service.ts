import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import {
  TReturnAllUsersResponseSchema,
  TUserUpdateRequestSchema,
  TuserCreationDataInterface,
  TuserCreationResponse,
} from "../interfaces/users.interfaces";
import {
  returnAllUsersResponseSchema,
  userCreationResponseSchema,
  userUpdateRequestSchema,
} from "../schemas/users.schemas";
import { AppError } from "../errors";

const createUserService = async (
  userData: TuserCreationDataInterface
): Promise<TuserCreationResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const createUser: User = userRepo.create(userData);
  await userRepo.save(createUser);

  const parsedUser = userCreationResponseSchema.parse(createUser);

  return parsedUser;
};

const listAllUsersService = async (
  userIsAdmin: boolean
): Promise<TReturnAllUsersResponseSchema> => {
  // FALTOU PASSAR EM UM TESTE - LISTAR TODOS USERS
  if (!userIsAdmin) {
    throw new AppError("Insufficient permission", 403);
  }
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const users: TReturnAllUsersResponseSchema = await userRepo.find();

  return returnAllUsersResponseSchema.parse(users);
};

const updateUserService = async (
  idFromRequest: number,
  idFromToken: number,
  userData: TUserUpdateRequestSchema,
  userIsAdmin: boolean
): Promise<TuserCreationResponse> => {
  if (userIsAdmin) {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const currentUser: User | null = await userRepo.findOneBy({
      id: idFromRequest,
    });
    const newUserData: User = userRepo.create({
      ...currentUser,
      ...(userData as DeepPartial<User>),
    });

    const returnNewUser: TuserCreationResponse =
      userCreationResponseSchema.parse(newUserData);

    await userRepo.save(returnNewUser as DeepPartial<User>);

    return returnNewUser;
  } else {
    if (idFromRequest === idFromToken) {
      const userRepo: Repository<User> = AppDataSource.getRepository(User);
      const currentUser: User | null = await userRepo.findOneBy({
        id: idFromRequest,
      });
      const newUserData: User = userRepo.create({
        ...currentUser,
        ...(userData as DeepPartial<User>),
      });

      const returnNewUser: TuserCreationResponse =
        userCreationResponseSchema.parse(newUserData);

      await userRepo.save(returnNewUser as DeepPartial<User>);

      return returnNewUser;
    } else {
      throw new AppError("Insufficient permission", 403);
    }
  }
};

export { listAllUsersService, createUserService, updateUserService };
