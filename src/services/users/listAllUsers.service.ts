import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { TReturnAllUsersResponseSchema } from "../../interfaces/users.interfaces";
import { returnAllUsersResponseSchema } from "../../schemas/users.schemas";

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

export { listAllUsersService };
