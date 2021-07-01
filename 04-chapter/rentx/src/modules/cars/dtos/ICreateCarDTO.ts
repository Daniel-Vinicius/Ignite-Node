interface ICreateCarDTO {
  name: string;
  description: string;
  brand: string;
  license_plate: string;
  category_id: string;

  daily_rate: number;
  fine_amount: number;
}

export { ICreateCarDTO };
