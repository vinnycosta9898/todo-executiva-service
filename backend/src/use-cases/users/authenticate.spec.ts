import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemmoryUsersRepository } from '../../repositories/in-memmory/in-memmory-users-repository'
import { AuthenticateUseCase } from './authenticate'

import { CredentialsInvalidError } from '../../errors/credentials-invalid-error'
import { PasswordLengthError } from '../../errors/password-length-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

let usersRepository: InMemmoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemmoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John doe store',
      email: 'johndoe@example.com',
      password: await hash('12345678', 6),
    })

    const user = await sut.execute({
      email: 'johndoe@example.com',
      password: '12345678'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with password less 8 cararctheres', async () => {
    await usersRepository.create({
      name: 'John doe store',
      email: 'johndoe@example.com',
      password: await hash('12345678', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(PasswordLengthError)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      name: 'John doe store',
      email: 'johndoe@example.com',
      password: await hash('12345678', 6)
    })

    await expect(() =>
      sut.execute({
        email: 'john@example.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John doe store',
      email: 'johndoe@example.com',
      password: await hash('12345678', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrongpass'
      })
    ).rejects.toBeInstanceOf(CredentialsInvalidError)
  })
})