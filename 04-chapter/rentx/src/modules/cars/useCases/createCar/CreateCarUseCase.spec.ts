import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  const car = {
    name: "Mercedes C180 Avantgarde",
    description: "Campeão de vendas do segmento de luxo no Brasil.",
    brand: "Mercedes Benz",
    license_plate: "CWY-2406",

    category_id: "4e736dd7-1c09-4b89-8a99-7c81a8d96124",

    daily_rate: 600,
    fine_amount: 200,
  };

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
