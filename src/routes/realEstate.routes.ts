import { Router } from "express";
import verifyCategoryTokenMiddleware from "../middlewares/verifyCategoryToken.middleware";
import createRealEstateController from "../controllers/realEstate.controllers";
import verifyAdminUserMiddleware from "../middlewares/verifyAdminUser.middleware";
import checkIfBodyRequestIsValidMiddleware from "../middlewares/validateRequest.middleware";
import { createRealEstateRequestSchema } from "../schemas/realEstate.schemas";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  verifyCategoryTokenMiddleware,
  verifyAdminUserMiddleware,
  checkIfBodyRequestIsValidMiddleware(createRealEstateRequestSchema),
  createRealEstateController
); // cria uma imóvel -- APENAS ADMIN
realEstateRoutes.get(""); // lista todos os iméveis -- QUALUER USAR - SEM TOKEN

export default realEstateRoutes;
