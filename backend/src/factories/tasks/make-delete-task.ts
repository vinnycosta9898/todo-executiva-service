import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { DeleteTaskUseCase } from "../../use-cases/tasks/delete-task";

export function makeCreateTask(){
    const tasksRepository = new PrismaTasksRepository()

    const usecase = new DeleteTaskUseCase(tasksRepository)

    return usecase
}