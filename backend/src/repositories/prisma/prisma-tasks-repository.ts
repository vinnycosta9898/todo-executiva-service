import { Prisma, Status, Task } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { TasksRepository } from "../tasks-repository";

export class PrismaTasksRepository implements TasksRepository{
    async create(data: Prisma.TaskCreateInput){
        const task = await prisma.task.create({data})

        return task
    }

    async deleteById(taskId: string) {
        const taskDeleted = await prisma.task.delete({
            where:{
                id: taskId
            }
        })

        if(!taskDeleted){
            return null
        }

        return taskDeleted
    }

    async findById(taskId: string) {
        const task = await prisma.task.findFirst({
            where:{
                id: taskId
            }
        })

        if(!task){
            return null
        }

        return task
    }

    async findByTitle(title: string) {
        const task = await prisma.task.findFirst({
            where:{
                title
            }
        })

        if(!task){
            return null
        }

        return task
    }


    async findManyByUser(userId: string) {
        const tasks = await prisma.task.findMany({
            where:{
                userId
            }
        })

        if(!tasks){
            return null
        }

        return tasks
    }

    async updateTask(status: Status, taskId: string) {
        const tasks = await prisma.task.update({
            where:{
                id: taskId
            },
            data:{
                status
            }
        })

        if(!tasks){
            return null
        }

        return tasks
    }
}