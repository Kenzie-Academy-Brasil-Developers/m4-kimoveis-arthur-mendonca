import { Router } from "express";

const loginRoutes: Router = Router();

loginRoutes.post(""); // gerar token de autenticação -- QUALQUER USER - SEM TOKEN

export default loginRoutes;
