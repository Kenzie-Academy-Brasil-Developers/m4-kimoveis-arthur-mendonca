import { Request, Response } from "express";
import { createCategoryService } from "../services/categories/createCategory.service";

const createCategoryController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categoryName = request.body;
  const createCategory = await createCategoryService(categoryName);

  return response.status(201).json(createCategory);
};

export { createCategoryController };
