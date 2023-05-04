import { Router } from "express";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(""); // cria uma imóvel -- APENAS ADMIN
realEstateRoutes.get(""); // lista todos os iméveis -- QUALUER USAR - SEM TOKEN

export default realEstateRoutes;
