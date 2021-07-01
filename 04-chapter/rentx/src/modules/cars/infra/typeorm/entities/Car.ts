import { v4 as uuidv4 } from "uuid";

class Car {
  id: string;
  category_id: string;

  name: string;
  description: string;
  brand: string;
  license_plate: string;

  available: boolean;

  daily_rate: number;
  fine_amount: number;

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
      this.created_at = new Date();
    }
  }
}

export { Car };
