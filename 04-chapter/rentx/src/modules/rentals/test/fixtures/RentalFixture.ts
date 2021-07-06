import dayjs from "dayjs";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

export const rental: ICreateRentalDTO = {
  user_id: "12345",
  car_id: "121212",
  expected_return_date: dayjs().add(1, "day").toDate(),
};
