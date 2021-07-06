import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

export const rental: ICreateRentalDTO = {
  user_id: "12345",
  car_id: "121212",
  expected_return_date: new Date(),
};
