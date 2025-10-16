import type { Request, Response } from 'express'
import { z } from 'zod'
import { makeRegister } from '../../../factories/users/make-register'
import { PasswordLengthError } from '../../../errors/password-length-error'
import { UserAlreadyExistsError } from '../../../errors/users-already-exists-error'


export async function register(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8).max(14),
  })

  try {
    const { name, email, password } = registerBodySchema.parse(req.body)

    const registerUseCase = makeRegister()

    const user = await registerUseCase.execute({
      name,
      email,
      password,
    })

    res.status(201).json({ id: user.user.id})
    
  } catch (err) {
    if (err instanceof PasswordLengthError) {
      res.status(403).send({ message: err.message })
    }

    if (err instanceof UserAlreadyExistsError) {
      res.status(409).send({ message: err.message })
    }

    res.status(500).send({ message: err })
  }
}