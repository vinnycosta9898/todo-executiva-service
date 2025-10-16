import { randomUUID } from "node:crypto";
import { Prisma, Task, Status, User } from "../../../generated/prisma";
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

  async deleteById(taskId: string) {
    const index = this.items.findIndex(item => item.id === taskId)

    if (index === -1) {
      return null
    }

    const [deleted] = this.items.splice(index, 1)
    return deleted
  }

  async findById(taskId: string) {
    const task = this.items.find(item => item.id === taskId)

    if(!task){
      return null
    }

    return task
  }

  async findByTitle(title: string) {
    const task = this.items.find(item => item.title === title)

    if(!task){
      return null
    }

    return task
  }

  async findManyByUser(userId: string){
    return this.items.filter(item => item.userId === userId)
  }
}
