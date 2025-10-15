import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import type { UsersRepository } from '../../repositories/users-repository'

interface GetListUserProfileRequest {
  userId: string
}

interface GetListUserProfileResponse {
  id: string
  name: string
  email: string
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId
  }: GetListUserProfileRequest): Promise<GetListUserProfileResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  }
}