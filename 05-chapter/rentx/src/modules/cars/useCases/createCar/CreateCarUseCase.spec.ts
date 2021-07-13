import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { car } from "@modules/cars/test/fixture/CarFixture";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create new car", async () => {
    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute(car);
      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("when creating a car the availability must be true by default", async () => {
    const carCreated = await createCarUseCase.execute({
      ...car,
      license_plate: "CDY-2406",
    });

    expect(carCreated.available).toBe(true);
  });
});
