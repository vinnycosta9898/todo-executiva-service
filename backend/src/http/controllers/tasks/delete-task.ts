import { Request, Response } from 'express'
import { makeDeleteTask } from '../../../factories/tasks/make-delete-task'
import { ResourceNotFoundError } from '../../../errors/resource-not-found-error'

export async function deleteTask(req: Request, res: Response) {
  const taskId = String(req.query.task_id)

  try {
    const deleteTaskUseCase = makeDeleteTask()

    const result = await deleteTaskUseCase.execute({
      taskId,
    })

    return res.status(200).json({ task: result })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: err.message })
    }

    console.error(err) // útil para debug
    return res.status(500).json({
      message: err instanceof Error ? err.message : 'Unexpected error.',
    })
  }
}
