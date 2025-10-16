import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { GetUserProfileUseCase } from "../../use-cases/users/get-profile"

export function makeUserGetProfile(){
    const usersRepository = new PrismaUsersRepository()

    const usecase = new GetUserProfileUseCase(usersRepository)

    return usecase
}