import { Request, Response} from 'express'
import z from "zod";
import { makeCreateTask } from '../../../factories/tasks/make-create-task';
import { TitleLengthError } from '../../../errors/title-length-error';
import { TaskWithSameTitleError } from '../../../errors/task-with-same-title-error';

export async function createTask(req: Request, res:Response){
    const createTaskBodySchema = z.object({
        title: z.string().min(4, { message: "O titulo deve conter no minimo 2 caractheres"}),
        description: z.string({ message: "A descricao e obrigatoria"}),
        userId: z.string()
    })

    try{
        const { title, description, userId } = createTaskBodySchema.parse(req.body)

        const createTaskUseCase = makeCreateTask()

        await createTaskUseCase.execute({
            title,
            description,
            userId
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