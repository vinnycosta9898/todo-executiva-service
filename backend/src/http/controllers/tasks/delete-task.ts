import { Request, Response} from 'express'
import { makeDeleteTask } from '../../../factories/tasks/make-delete-task';
import { ResourceNotFoundError } from '../../../errors/resource-not-found-error';

export async function deleteTask(req: Request, res:Response){
    const taskId = String(req.params.taskId)
    
    try{
        
        const deleteTaskUseCase = makeDeleteTask()

        await deleteTaskUseCase.execute({
            taskId
        })
    }catch(err){
        if(err instanceof ResourceNotFoundError){
            res.status(404).send({ message: err.message})
        }

        res.status(500).send({message: err})
    }
}