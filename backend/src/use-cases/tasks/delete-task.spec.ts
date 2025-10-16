import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteTaskUseCase } from './delete-task'
import { InMemoryTasksRepository } from '../../repositories/in-memmory/in-memmory-tasks-repository'

let tasksRepository: InMemoryTasksRepository
let sut: DeleteTaskUseCase

describe('Delete task test', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new DeleteTaskUseCase(tasksRepository)
  })

  it('should be able to delete user profile', async () => {
    const createdTask = await tasksRepository.create({
      title: "Estudar POO",
      description: "Aprofundar em heranca"
    })

    await sut.execute({
      taskId: createdTask.id
    })

    const taskStillExists = tasksRepository.items.find(
      item => item.id === createdTask.id
    )

    expect(taskStillExists).toBeUndefined()
  })
})
