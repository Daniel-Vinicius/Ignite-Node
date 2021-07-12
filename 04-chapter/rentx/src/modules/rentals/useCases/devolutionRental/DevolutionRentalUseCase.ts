import { inject, injectable } from "tsyringe";
import { validate } from "uuid";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minimum_daily = 1;

    if (!validate(id) || !validate(user_id)) {
      throw new AppError("The id and user_id field must be of a valid UUID.");
    }

    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental does not exists!", 404);
    }

    if (rental.end_date) {
      throw new AppError("Rental was ended.", 400);
    }

    const car = await this.carsRepository.findById(rental.car_id);

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    // function addDays(date, days) {
    //   const result = new Date(date);
    //   result.setDate(result.getDate() + days);
    //   return result;
    // }

    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      // addDays(rental.expected_return_date, 3)
      this.dateProvider.dateNow()
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total += calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;
    rental.updated_at = new Date();

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
