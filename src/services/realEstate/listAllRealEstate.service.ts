import { Repository } from "typeorm";
import { Address, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { listAllRealEstatesSchema } from "../../schemas/realEstate.schemas";

const listAllRealEstateService = async (): Promise<RealEstate[]> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstates = await realEstateRepo.find({
    relations: { address: true },
  });

  return realEstates;
};

export default listAllRealEstateService;
