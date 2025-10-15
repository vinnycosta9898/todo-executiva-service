import { beforeEach, describe, expect, it } from 'vitest'
import { PasswordLengthError } from '../../errors/password-length-error'
import { InMemmoryUsersRepository } from '../../repositories/in-memmory/in-memmory-users-repository'
import { RegisterUseCase } from './register'
import { UserAlreadyExistsError } from '../../errors/users-already-exists-error'

let usersRepository: InMemmoryUsersRepository
let sut: RegisterUseCase

describe('Register test', () => {
  beforeEach(() => {
    usersRepository = new InMemmoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able register user', async () => {
    const { user } = await sut.execute({
      name: 'John doe store',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register with password less 8 caractheres or more 14 caractheres', async () => {
    await expect(() =>
      sut.execute({
        name: 'John doe store',
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(PasswordLengthError)
  })

  it('should be able register user with same email', async () => {
    await usersRepository.create({
      name: 'John doe store',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    await expect(() =>
      sut.execute({
        name: 'John doe store',
        email: 'johndoe@example.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})