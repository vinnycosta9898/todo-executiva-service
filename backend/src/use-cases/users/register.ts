import { hash } from "bcryptjs"
import { User } from "../../../generated/prisma"
import { PasswordLengthError } from "../../errors/password-length-error"
import { UserAlreadyExistsError } from "../../errors/users-already-exists-error"
import { UsersRepository } from "../../repositories/users-repository"

interface RegisterUseCaseRequest{
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse{
    user: User
}

export class RegisterUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({ name, email, password } : RegisterUseCaseRequest) : Promise<RegisterUseCaseResponse>{
        if (password.length < 8 || password.length > 14) {
            throw new PasswordLengthError()
          }
      
          const passwordHash = await hash(password, 8)
      
          const userWithSameEmail = await this.usersRepository.findByEmail(email)
      
          if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
          }
      
          const user = await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
          })

          return { user }
    }
}