import { Task } from "../../../generated/prisma"
import { DescriptionLengthError } from "../../errors/description-error-length"
import { TaskWithSameTitleError } from "../../errors/task-with-same-title-error"
import { TitleLengthError } from "../../errors/title-length-error"
import { TasksRepository } from "../../repositories/tasks-repository"

interface CreateTaskRequest{
    title: string
    description: string
    userId: string
}

interface CreateTaksResponse{
    task: Task
}

export class CreateTaskUseCase{
    constructor(private tasksRepository: TasksRepository){}

    async execute({ title, description, userId } : CreateTaskRequest): Promise<CreateTaksResponse>{
        const taskWithSameTitle = await this.tasksRepository.findByTitle(title)
        
        if(title.length < 4 || title.length > 64){
            throw new TitleLengthError()
        }

        if(taskWithSameTitle){
            throw new TaskWithSameTitleError()
        }

        if(description.length < 8 || title.length > 256){
            throw new DescriptionLengthError()
        }
        
        if(taskWithSameTitle){
            throw new TaskWithSameTitleError()
        }



        const task = await this.tasksRepository.create({
            title,
            description,
            User:{
                connect:{
                    id: userId
                }
            }
        })

        return {
            task
        }


    }
}