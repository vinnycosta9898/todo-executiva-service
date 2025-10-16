import { Task } from "../../../generated/prisma"
import { TaskListEmpytError } from "../../errors/tasks-list-empyt-error"
import { TasksRepository } from "../../repositories/tasks-repository"

interface ListTasksByUserRequest{
    userId: string
}

interface ListTasksbyUserResponse{
    tasks: Task[] | null
}

export class ListTasksByUserUseCase{
    constructor(private tasksRepository: TasksRepository){}

    async execute({ userId }: ListTasksByUserRequest): Promise<ListTasksbyUserResponse>{
        const tasks = await this.tasksRepository.findManyByUser(userId)

        if(!tasks){
            throw new TaskListEmpytError()
        }

        return {
            tasks
        }
    }
}