import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../../use-cases/users/authenticate";

export function makeAuthenticate(){
    const usersRepository = new PrismaUsersRepository()

    const usecase = new AuthenticateUseCase(usersRepository)

    return usecase
}