import { randomUUID } from "node:crypto";
import { Prisma, Task, Status } from "../../../generated/prisma";
import { TasksRepository } from "../tasks-repository";

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  async create(data: Prisma.TaskCreateInput) {
    const task: Task = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      status: Status.pending, 
      userId: (data.User as any)?.connect?.id ?? null
    };

    this.items.push(task);
    
    return task;
  }
}
