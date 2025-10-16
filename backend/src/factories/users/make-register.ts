import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../../use-cases/users/register";

export function makeRegister(){
    const usersRepository = new PrismaUsersRepository()

    const usecase = new RegisterUseCase(usersRepository)

    return usecase
}