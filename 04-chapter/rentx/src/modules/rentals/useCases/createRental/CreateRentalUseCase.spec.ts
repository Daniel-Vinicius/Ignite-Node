import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { rental as RentalFixture } from "@modules/rentals/test/fixtures/RentalFixture";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute(RentalFixture);

    expect(rental).toHaveProperty("start_date");
    expect(rental).toHaveProperty("id");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({ ...RentalFixture, car_id: "123" });
      await createRentalUseCase.execute({ ...RentalFixture, car_id: "321" });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({ ...RentalFixture, user_id: "123" });
      await createRentalUseCase.execute({ ...RentalFixture, user_id: "321" });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "ANY_CAR_ID",
        user_id: "ANY_USER_ID",

        expected_return_date: dayjs().add(20, "hours").toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
