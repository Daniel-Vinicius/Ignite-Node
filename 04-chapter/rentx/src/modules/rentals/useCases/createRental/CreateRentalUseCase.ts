import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;

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
