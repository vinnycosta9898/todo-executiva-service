import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTasksRepository } from "../../repositories/in-memmory/in-memmory-tasks-repository";
import { ListTasksByUserUseCase } from "./list-tasks-by-user";

let tasksRepository: InMemoryTasksRepository
let sut: ListTasksByUserUseCase


describe("List tasks by user test", async () => {
    beforeEach(() => {
        tasksRepository = new InMemoryTasksRepository()
        sut = new ListTasksByUserUseCase(tasksRepository)
    })

    it("should be able to list tasks by user", async () => {
        await tasksRepository.create({
            title: "Estudar Next",
            description: "Aprofundar nos conceitos de SSR ",
            User:{
                connect:{
                    id: "user-id"
                }
            }
        })

        const { tasks } = await sut.execute({
            userId: 'user-id'
        })
        
        expect(tasks).toHaveLength(1)
    })
})