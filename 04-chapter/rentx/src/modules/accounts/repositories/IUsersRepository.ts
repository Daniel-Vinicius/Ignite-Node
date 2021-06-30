import { User } from "../entities/User";

export interface ICreateUsersDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  id?: string;
  avatar?: string;
}

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
