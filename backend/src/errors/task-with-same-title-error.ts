export class TaskWithSameTitleError extends Error{
    constructor(){
        super("Task with same title already exists")
    }
}