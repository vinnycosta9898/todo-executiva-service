import { Status } from '../../../../generated/prisma';
import { Request, Response} from 'express'
import z from "zod";
import { TitleLengthError } from '../../../errors/title-length-error';
import { TaskWithSameTitleError } from '../../../errors/task-with-same-title-error';
import { makeUpdateTask } from '../../../factories/tasks/make-update-task';

export async function updatedTask(req: Request, res:Response){
    const createTaskBodySchema = z.object({
        taskId: z.string(),
        status: Status
    })

    try{
        const { taskId, status } = createTaskBodySchema.parse(req.body)

        const updateTaskUseCase = makeUpdateTask()

        await updateTaskUseCase.execute({
            status: Status.in_progress,
            taskId
        })
    }catch(err){
        if(err instanceof TitleLengthError){
            res.status(422).send({ message: err.message})
        }

        if(err instanceof TaskWithSameTitleError){
            res.status(409).send({message: err.message})
        }

        res.status(500).send({message: err})
    }
}