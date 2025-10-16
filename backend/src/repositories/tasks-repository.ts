import { Prisma, Task } from "../../generated/prisma";

export interface TasksRepository {
    create(data: Prisma.TaskCreateInput): Promise<Task>
}