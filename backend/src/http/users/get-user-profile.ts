
import type { Request, Response } from 'express'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { makeUserGetProfile } from '../../factories/users/make-get-profile'

export async function getUserProfile(req: Request, res: Response) {
  const user_id = String(req.query.user_id)

  try {
    const getUserProfileUseCase = makeUserGetProfile()

    const user = await getUserProfileUseCase.execute({
      userId: user_id
    })

    res.status(200).json(user)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(404).send({ message: err.message })
    }
  }
}
