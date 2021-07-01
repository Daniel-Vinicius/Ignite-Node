import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
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

  it("should be able to list all available cars", async () => {
    const carCreatedAvailable = await carsRepositoryInMemory.create(car);

    const cars = await listCarsUseCase.execute({});

    expect(cars[0]).toEqual(carCreatedAvailable);
  });

  it("should be able to list all available cars by name", async () => {
    const carCreatedWithNamePassed = await carsRepositoryInMemory.create(car);

    await carsRepositoryInMemory.create({
      ...car,
      name: "Other Name",
      license_plate: "CAY-2406",
    });

    const cars = await listCarsUseCase.execute({ name: car.name });

    expect(cars).toEqual([carCreatedWithNamePassed]);
  });
});
