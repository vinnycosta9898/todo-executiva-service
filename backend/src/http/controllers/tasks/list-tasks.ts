import { Request, Response} from 'express'
import { makeListTask } from '../../../factories/tasks/make-list-tasks';
import { TaskListEmpytError } from '../../../errors/tasks-list-empyt-error';

export async function listTasksByUser(req: Request, res:Response){
    const userId = String(req.params.taskId)
    
    try{
        const lisTasksUseCase = makeListTask()

        await lisTasksUseCase.execute({
            userId
        })

    }catch(err){
        if(err instanceof TaskListEmpytError){
            res.status(200).send({ message: err.message})
        }

        res.status(500).send({message: err})
    }
}