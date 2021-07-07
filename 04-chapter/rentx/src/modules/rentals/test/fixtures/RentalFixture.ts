import dayjs from "dayjs";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

export const rental: ICreateRentalDTO = {
  user_id: "12345",
  car_id: "e895aa89-37c3-45cf-a272-f957f8f9b3f6",
  expected_return_date: dayjs().add(1, "day").toDate(),
};
