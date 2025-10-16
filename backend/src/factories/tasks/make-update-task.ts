import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { UpdateTaskUseCase } from "../../use-cases/tasks/update-task";

export function makeUpdateTask(){
    const tasksRepository = new PrismaTasksRepository()

    const usecase = new UpdateTaskUseCase(tasksRepository)

    return usecase
}