import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, username, driver_license } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const data = {
      name,
      email,
      password,
      username,
      driver_license,
    };

    await createUserUseCase.execute(data);

    return response.status(201).send();
  }
}

export { CreateUserController };
