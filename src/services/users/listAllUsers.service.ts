import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { TReturnAllUsersResponseSchema } from "../../interfaces/users.interfaces";
import {
  returnAllUsersResponseSchema,
  userUpdateResponseShema,
} from "../../schemas/users.schemas";

const listAllUsersService =
  async (): Promise<TReturnAllUsersResponseSchema> => {
    // FALTOU PASSAR EM UM TESTE - LISTAR TODOS USERS

    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const users: User[] = await userRepo.find();

    return userUpdateResponseShema.parse(users);
  };

export { listAllUsersService };
