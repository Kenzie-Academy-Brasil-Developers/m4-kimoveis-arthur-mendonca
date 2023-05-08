import { Router } from "express";
import { createCategoryController } from "../controllers/categories.controllers";
import verifyCategoryNameMiddleware from "../middlewares/verifyCategoryName.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import verifyAdminUserMiddleware from "../middlewares/verifyAdminUser.middleware";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  verifyCategoryNameMiddleware,
  verifyTokenMiddleware,
  createCategoryController
); // criar uma categoria; -- apenas ADMIN
categoriesRoutes.get(""); // listar todas as categorias; -- QUALQUER USER - SEM TOKEN
categoriesRoutes.get("/:id/realEstate"); // listar todas os imóveis que pertençam a uma categoria QUALQUER USER -- SEM TOKEN

export default categoriesRoutes;
