
import type { Request, Response } from 'express'
import { z } from 'zod'

import { CredentialsInvalidError } from '../../errors/credentials-invalid-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { makeAuthenticate } from '../../factories/users/make-authenticate'


export async function authenticate(req: Request, res: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(14)
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticate()

    const response = await authenticateUseCase.execute({
      email,
      password
    })

    const user = {
      id: response.id,
      name: response.name,
      token: response.token
    }

    res.status(200).send(user)
  } catch (err) {
    if (err instanceof CredentialsInvalidError) {
      res.status(401).send({ message: err.message })
    }
    if (err instanceof ResourceNotFoundError) {
      res.status(404).send({ message: err.message })
    }
  }
}


