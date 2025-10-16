import { Prisma, Task, User } from "../../generated/prisma";

export interface TasksRepository {
    create(data: Prisma.TaskCreateInput): Promise<Task>
    findByTitle(title: string): Promise<Task | null>
    findManyByUser(userId: string): Promise<Task[] | null>
}