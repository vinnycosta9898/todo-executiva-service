import { Task } from "../../../generated/prisma"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"
import { TaskListEmpytError } from "../../errors/tasks-list-empyt-error"
import { TasksRepository } from "../../repositories/tasks-repository"

interface DeleteTaskUseCaseRequest{
    taskId: string
}

interface DeleteTaskUseCaseResponse{
    deleteTask: Task | null
}

export class DeleteTaskUseCase{
    constructor(private tasksRepository: TasksRepository){}

    async execute({ taskId }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse>{
        
        const deleteTask = await this.tasksRepository.deleteById(taskId)

        if(!deleteTask){
            throw new ResourceNotFoundError()
        }

        return {
            deleteTask
        }
    }
}