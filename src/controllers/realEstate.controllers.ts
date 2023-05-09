import createRealEstateService from "../services/realEstate/createRealEstate.service";
import { Request, Response } from "express";

const createRealEstateController = async (
  request: Request,
  response: Response
) => {
  const requestData = request.body;

  const createNewRealEstate = await createRealEstateService(requestData);

  return response.status(201).json(createNewRealEstate);
};

export default createRealEstateController;
