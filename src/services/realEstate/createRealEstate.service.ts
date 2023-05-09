import { DeepPartial, Repository } from "typeorm";
import { Address, Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import {
  TCreateRealEstateCreation,
  TCreateRealEstateRequest,
  TCreateRealEstateResponse,
} from "../../interfaces/realEstate.interfaces";
import { createRealEstateResponseSchema } from "../../schemas/realEstate.schemas";
import { AppError } from "../../errors";

const createRealEstateService = async (
  requestData: TCreateRealEstateRequest
): Promise<any> => {
  const { address, categoryId, ...realEstateData } = requestData;

  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);
  // VERIFICAR SE O ADDRESS JÁ EXISTE

  const checkAddress: Address | null = await addressRepo.findOne({
    where: {
      street: address.street,
      zipCode: address.zipCode,
      city: address.city,
      state: address.state,
      number: address.number || "",
    },
  });

  if (checkAddress) {
    throw new AppError("Address already exists", 409);
  }

  const createNewAddress: Address = addressRepo.create({
    ...address,
    number: address.number || "",
  });
  await addressRepo.save(createNewAddress);

  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const getCategory: Category | null = await categoryRepo.findOneBy({
    id: categoryId,
  });

  if (!getCategory) {
    throw new AppError("Category not found", 404);
  }

  const createNewRealEstate: RealEstate = realEstateRepo.create({
    ...realEstateData,
    address: createNewAddress,
    category: getCategory,
  });

  await realEstateRepo.save(createNewRealEstate);

  //   const { category, ...realEstateInfo } = createNewRealEstate;

  //   const responseData = createRealEstateResponseSchema.parse({
  //     ...realEstateInfo,
  //     category: {
  //       id: category.id,
  //       name: category.name,
  //     },
  //   });

  return createNewRealEstate;
};

export default createRealEstateService;

// status: 201,
//       expectBody: { ...realEstateInfo, category },

// Real_State_body
// id: any;
// value: number;
// size: number;
// createdAt: any;
// updatedAt: any;

// ADRESS
// street: string;
//     zipCode: string;
//     city: string;
//     state: string;

// &

// category: {
//     name: string;
