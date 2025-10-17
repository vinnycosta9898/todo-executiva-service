import { Status, Task } from "../../../generated/prisma"
import { TaskListEmpytError } from "../../errors/tasks-list-empyt-error"
import { TasksRepository } from "../../repositories/tasks-repository"

interface UpdateTaskRequest {
  taskId: string
}

interface UpdateTaskResponse {
  taskUpdated: Task | null
}

export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ taskId }: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const task = await this.tasksRepository.findById(taskId)
  
    if (!task) {
      throw new TaskListEmpytError()
    }

    // Define a lógica de avanço de status
    let newStatus: Status
    switch (task.status) {
      case 'pending':
        newStatus = 'in_progress'
        break
      case 'in_progress':
        newStatus = 'completed'
        break
      case 'completed':
        newStatus = 'completed'
        break
      default:
        newStatus = task.status
    }

    const taskUpdated = await this.tasksRepository.updateTask(newStatus, taskId)
  
    return { taskUpdated }
  }  
}
