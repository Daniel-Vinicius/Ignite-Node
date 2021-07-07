import { inject, injectable } from "tsyringe";
import { validate } from "uuid";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;

    if (this.dateProvider.validate(expected_return_date) !== true) {
      throw new AppError(
        "The expected_return_date field must be of type Date."
      );
    }

    if (!validate(car_id)) {
      throw new AppError("The car_id field must be of a valid UUID.");
    }

    const carInOpenRental = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carInOpenRental) {
      throw new AppError("Car is Unavailable");
    }

    const userInOpenRental = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userInOpenRental) {
      throw new AppError("There's a rental in progress for user!");
    }

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    if (compare < minimumHour) {
      throw new AppError("Rent must be at least 24 hours!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
