import { Specification } from "../../model/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  execute(): Specification[] {
    return this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase };
