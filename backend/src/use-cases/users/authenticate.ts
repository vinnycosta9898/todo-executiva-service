import type { UsersRepository } from '../../repositories/users-repository'

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { PasswordLengthError } from '../../errors/password-length-error'
import { CredentialsInvalidError } from '../../errors/credentials-invalid-error'


interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  id: string
  name: string
  token: string
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (password.length < 8) {
      throw new PasswordLengthError()
    }

    const doesPasswordMatch = await compare(password, user.password)

    if (!doesPasswordMatch) {
      throw new CredentialsInvalidError()
    }

    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      `${process.env.JWT_SECRET}`,
      {
        subject: user.id,
        expiresIn: '1D'
      }
    )

    return {
      id: user.id,
      name: user.name,
      token
    }
  }
}