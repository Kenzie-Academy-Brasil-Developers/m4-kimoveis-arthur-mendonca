import { Router } from "express";

const userRoutes: Router = Router();

userRoutes.post(""); // criar usuário
userRoutes.get(""); // listar usuários -- APENAS ADMIN
userRoutes.patch("/:id"); // editar usuário -- APENAS ADMIN ou dono da própria conta
userRoutes.delete("/:id"); // soft delete usuário -- APENAS ADMIN

export default userRoutes;
