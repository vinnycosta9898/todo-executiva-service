import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { ListTasksByUserUseCase } from "../../use-cases/tasks/list-tasks-by-user";

export function makeListTask(){
    const tasksRepository = new PrismaTasksRepository()

    const usecase = new ListTasksByUserUseCase(tasksRepository)

    return usecase
}