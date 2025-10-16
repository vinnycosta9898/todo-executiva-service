import { describe, it, expect, beforeEach, vi } from "vitest";
import { Status } from "../../../generated/prisma";
import { UpdateTaskUseCase } from "./update-task";
import { InMemoryTasksRepository } from "../../repositories/in-memmory/in-memmory-tasks-repository";

describe("UpdateTaskUseCase", () => {
  let tasksRepository: InMemoryTasksRepository;
  let sut: UpdateTaskUseCase; 

  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new UpdateTaskUseCase(tasksRepository);
  });

  it("should be able to update a task status", async () => {
    const createdTask = await tasksRepository.create({
      title: "Estudar SOLID",
      description: "Aprofundar nos conceitos de inversão de dependência",
      User: {
        connect: {
          id: "user-01",
        },
      },
    })
  
    const { taskUpdated } = await sut.execute({
      taskId: createdTask.id, // ✅ usa o id real
      status: Status.in_progress,
    })
  
    expect(taskUpdated!.status).toEqual(Status.in_progress)
  })
  
});
