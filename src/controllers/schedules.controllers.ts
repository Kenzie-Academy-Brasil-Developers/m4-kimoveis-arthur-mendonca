import { Request, Response } from "express";
import createSchedulesService from "../services/schedules/createSchedules.service";

const createSchedulesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestData = request.body;
  const userId = Number(response.locals.id);

  const createSchedule = await createSchedulesService(requestData, userId);

  return response.status(201).json(createSchedule);
};

export { createSchedulesController };
