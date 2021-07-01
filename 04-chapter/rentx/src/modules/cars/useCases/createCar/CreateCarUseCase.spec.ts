import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

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
    await createCarUseCase.execute(car);
  });
});
