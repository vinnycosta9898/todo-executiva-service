import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTasksRepository } from "../../repositories/in-memmory/in-memmory-tasks-repository";
import { CreateTaskUseCase } from "./create-task";
import { TaskWithSameTitleError } from "../../errors/task-with-same-title-error";
import { TitleLengthError } from "../../errors/title-length-error";
import { DescriptionLengthError } from "../../errors/description-error-length";

let tasksRepository: InMemoryTasksRepository
let sut: CreateTaskUseCase

describe("Create task test", () => {
    beforeEach(() => {
        tasksRepository = new InMemoryTasksRepository()
        sut = new CreateTaskUseCase(tasksRepository)
    })

    it("should be able to create a task", async () => {
        const { task } = await sut.execute({
            title: "Estudar SOLID",
            description: "Aprofundar nos conceitos de iunversao de dependencia ",
            userId: "user-id"
        })

        expect(task.id).toEqual(expect.any(String))
    })

    it("should no be able to create a task with less 4 caractheres or more thans 64 caractheres", async () => {
        await expect(() =>
            sut.execute({
                title: "O",
                description: "Aprofundar nos conceitos de iunversao de dependencia ",
                userId: "user-id"
            })
          ).rejects.toBeInstanceOf(TitleLengthError)

    })

    it("should no be able to create a task with description less 8 caractheres or more thans 256 caractheres", async () => {
        await expect(() =>
            sut.execute({
                title: "Estudar SOLID",
                description: "O",
                userId: "user-id"
            })
          ).rejects.toBeInstanceOf(DescriptionLengthError)

    })


    it("should no be able to create a task with same title", async () => {
        await tasksRepository.create({
            title: "Estudar SOLID",
            description: "Aprofundar nos conceitos de iunversao de dependencia ",
            User:{
                connect:{
                    id: "user-id"
                }
            }
        })

        await expect(() =>
            sut.execute({
                title: "Estudar SOLID",
                description: "Aprofundar nos conceitos de iunversao de dependencia ",
                userId: "user-id"
            })
          ).rejects.toBeInstanceOf(TaskWithSameTitleError)

    })
})