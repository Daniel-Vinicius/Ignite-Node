import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars[0]).toEqual(carCreatedAvailable);
  });

  it("should be able to list all available cars by name", async () => {
    const carCreatedWithNamePassed = await carsRepositoryInMemory.create(car);

    await carsRepositoryInMemory.create({
      ...car,
      name: "Other Name",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: car.name });

    expect(cars).toEqual([carCreatedWithNamePassed]);
  });

  it("should be able to list all available cars by brand", async () => {
    const carCreatedWithBrandPassed = await carsRepositoryInMemory.create(car);

    await carsRepositoryInMemory.create({
      ...car,
      brand: "Other brand",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: car.brand });

    expect(cars).toEqual([carCreatedWithBrandPassed]);
  });

  it("should be able to list all available cars by category_id", async () => {
    const carCreatedWithCategoryIdPassed = await carsRepositoryInMemory.create(
      car
    );

    await carsRepositoryInMemory.create({
      ...car,
      category_id: "Other category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars).toEqual([carCreatedWithCategoryIdPassed]);
  });
});
