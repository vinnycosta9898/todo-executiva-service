import { Status, Task } from "../../../generated/prisma"
import { TaskListEmpytError } from "../../errors/tasks-list-empyt-error"
import { TasksRepository } from "../../repositories/tasks-repository"


interface UpdateTaskRequest {
  status: Status
  taskId: string
}

interface UpdateTaskResponse {
  taskUpdated: Task | null
}

export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ status, taskId }: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const task = await this.tasksRepository.findById(taskId)
  
    if (!task) {
      throw new TaskListEmpytError()
    }
  
    const validStatuses = Object.values(Status)
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status value: ${status}`)
    }
  
    const taskUpdated = await this.tasksRepository.updateTask(status, taskId)
  
    return { taskUpdated }
  }  
}
