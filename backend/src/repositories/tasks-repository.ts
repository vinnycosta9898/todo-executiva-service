import { Prisma, Task, Status } from "../../generated/prisma";

export interface TasksRepository {
    create(data: Prisma.TaskCreateInput): Promise<Task>
    deleteById(taskId: string): Promise<Task | null>
    findById(taskId: string): Promise<Task | null>
    findByTitle(title: string): Promise<Task | null>
    findManyByUser(userId: string): Promise<Task[] | null>
    updateTask(status: Status, taskId: string): Promise<Task | null>;
}