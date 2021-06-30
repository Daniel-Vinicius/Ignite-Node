import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

const newUser = {
  name: "John Do",
  email: "john@do.com",
  driver_license: "123456",
  password: "secret",
};

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    await createUserUseCase.execute(newUser);

    const tokenAndUserObject = await authenticateUserUseCase.execute({
      email: newUser.email,
      password: newUser.password,
    });

    expect(tokenAndUserObject).toHaveProperty("token");
  });

  it("should not be able to authenticate an non-existent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "non.existent.user@test.com",
        password: "secret",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    expect(async () => {
      await createUserUseCase.execute(newUser);

      await authenticateUserUseCase.execute({
        email: newUser.email,
        password: "incorrectPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
