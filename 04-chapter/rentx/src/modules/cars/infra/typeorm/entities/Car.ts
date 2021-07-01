// import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
// import { v4 as uuidv4 } from "uuid";

// @Entity("cars")
// class Car {
//   @PrimaryColumn()
//   id?: string;

//   @Column()
//   name: string;

//   @Column()
//   description: string;

//   @Column()
//   brand: string;

//   @CreateDateColumn()
//   created_at: Date;

//   constructor() {
//     if (!this.id) {
//       this.id = uuidv4();
//     }
//   }
// }

// export { Car };

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
}

export { Car };
