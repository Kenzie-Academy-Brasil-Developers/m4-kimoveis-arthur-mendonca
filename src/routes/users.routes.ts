import { Router } from "express";
import {
  updateUserController,
  createUserController,
  listAllUsersController,
} from "../controllers/users.controllers";
import verifyUserEmailMiddleware from "../middlewares/verifyUserEmail.middleware";
import checkIfBodyRequestIsValidMiddleware from "../middlewares/validateRequest.middleware";
import { userCreationRequestSchema } from "../schemas/users.schemas";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import verifyIdMiddleware from "../middlewares/verifyId.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  checkIfBodyRequestIsValidMiddleware(userCreationRequestSchema),
  verifyUserEmailMiddleware,
  createUserController
); // criar usuário
userRoutes.get("", verifyTokenMiddleware, listAllUsersController); // listar usuários -- APENAS ADMIN
userRoutes.patch(
  "/:id",
  verifyIdMiddleware,
  verifyTokenMiddleware,
  updateUserController
); // editar usuário -- APENAS ADMIN ou dono da própria conta
userRoutes.delete("/:id"); // soft delete usuário -- APENAS ADMIN

export default userRoutes;
