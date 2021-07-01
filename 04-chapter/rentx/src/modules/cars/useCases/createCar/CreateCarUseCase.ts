import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    brand,
    license_plate,
    category_id,
    daily_rate,
    fine_amount,
  }: ICreateCarDTO): Promise<void> {
    this.carsRepository.create({
      name,
      description,
      brand,
      license_plate,
      category_id,
      daily_rate,
      fine_amount,
    });
  }
}

export { CreateCarUseCase };
