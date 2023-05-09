import { Router } from "express";
import {
  createCategoryController,
  getAllCategoriesController,
} from "../controllers/categories.controllers";
import verifyCategoryNameMiddleware from "../middlewares/verifyCategoryName.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import verifyCategoryTokenMiddleware from "../middlewares/verifyCategoryToken.middleware";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  verifyCategoryNameMiddleware,
  verifyCategoryTokenMiddleware,
  createCategoryController
); // criar uma categoria; -- apenas ADMIN
categoriesRoutes.get("", getAllCategoriesController); // listar todas as categorias; -- QUALQUER USER - SEM TOKEN
categoriesRoutes.get("/:id/realEstate"); // listar todas os imóveis que pertençam a uma categoria QUALQUER USER -- SEM TOKEN

export default categoriesRoutes;
