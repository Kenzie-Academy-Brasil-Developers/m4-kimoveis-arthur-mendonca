import { DeepPartial, Repository } from "typeorm";
import { TCategoryCreationResponseSchema } from "../../interfaces/categories.interface";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { categoryCreationResponseSchema } from "../../schemas/categories.schema";
import { AppError } from "../../errors";

const createCategoryService = async (
  name: string
): Promise<TCategoryCreationResponseSchema> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const createCategory: Category = categoryRepo.create(
    name as DeepPartial<Category>
  );
  await categoryRepo.save(createCategory);

  const parseCategory = categoryCreationResponseSchema.parse(createCategory);

  return parseCategory;
};

export { createCategoryService };
