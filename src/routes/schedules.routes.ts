import { Router } from "express";

const scheduleRoutes: Router = Router();

scheduleRoutes.post(""); // agenda uma visita a um imóvel
scheduleRoutes.get("/realEstate/:id"); // lista todos os agendamentos de um imóvel

export default scheduleRoutes;
