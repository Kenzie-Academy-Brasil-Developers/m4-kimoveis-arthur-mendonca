import { Router } from "express";
import { loginUserController } from "../controllers/login.controllers";

const loginRoutes: Router = Router();

loginRoutes.post("", loginUserController); // gerar token de autenticação -- QUALQUER USER - SEM TOKEN

export default loginRoutes;
