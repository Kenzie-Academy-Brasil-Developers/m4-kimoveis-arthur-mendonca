import { Router } from "express";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(""); // criar uma categoria; -- apenas ADMIN
categoriesRoutes.get(""); // listar todas as categorias; -- QUALQUER USER - SEM TOKEN
categoriesRoutes.get("/:id/realEstate"); // listar todas os imóveis que pertençam a uma categoria QUALQUER USER -- SEM TOKEN

export default categoriesRoutes;
