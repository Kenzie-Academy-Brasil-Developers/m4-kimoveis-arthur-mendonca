import { Request, Response } from "express";
import { createCategoryService } from "../services/categories/createCategory.service";
import getAllCategoriesService from "../services/categories/getAllCategories.service";

const createCategoryController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categoryName = request.body;
  const userIsAdmin = response.locals.userIsAdmin;
  const createCategory = await createCategoryService(categoryName, userIsAdmin);

  return response.status(201).json(createCategory);
};

const getAllCategoriesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const getAllCategories = await getAllCategoriesService();

  return response.status(200).json(getAllCategories);
};

export { createCategoryController, getAllCategoriesController };
