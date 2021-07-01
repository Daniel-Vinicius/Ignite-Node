import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
}

export { ISpecificationsRepository };
