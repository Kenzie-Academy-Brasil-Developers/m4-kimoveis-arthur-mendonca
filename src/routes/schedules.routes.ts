import { Router } from "express";
import { createSchedulesController } from "../controllers/schedules.controllers";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import checkIfBodyRequestIsValidMiddleware from "../middlewares/validateRequest.middleware";
import { scheduleCreationSchema } from "../schemas/schedules.schema";
import verifyExistingScheduleMiddleware from "../middlewares/verifyExistingSchedule.middleware";
import verifyUserScheduleMiddleware from "../middlewares/verifyUserSchedule.middleware";

const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "",
  verifyTokenMiddleware,
  checkIfBodyRequestIsValidMiddleware(scheduleCreationSchema),
  verifyExistingScheduleMiddleware,
  verifyUserScheduleMiddleware,
  createSchedulesController
); // agenda uma visita a um imóvel
scheduleRoutes.get("/realEstate/:id"); // lista todos os agendamentos de um imóvel

export default scheduleRoutes;
