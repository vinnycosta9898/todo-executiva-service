import { Request, Response } from "express";
import { makeListTask } from "../../../factories/tasks/make-list-tasks";
import { TaskListEmpytError } from "../../../errors/tasks-list-empyt-error";

export async function listTasksByUser(req: Request, res: Response) {
  const userId = req.params.user_id as string;
  
  console.log(userId)

  try {
    const listTasksUseCase = makeListTask();

    const { tasks } = await listTasksUseCase.execute({ userId });

    return res.status(200).json({ tasks });
  } catch (err) {
    if (err instanceof TaskListEmpytError) {
      return res.status(200).json({ message: err.message, tasks: [] });
    }

    return res.status(500).json({ message: "Internal server error", error: String(err) });
  }
}
