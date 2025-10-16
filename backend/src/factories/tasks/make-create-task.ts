import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { CreateTaskUseCase } from "../../use-cases/tasks/create-task";

export function makeCreateTask(){
    const tasksRepository = new PrismaTasksRepository()

    const usecase = new CreateTaskUseCase(tasksRepository)

    return usecase
}