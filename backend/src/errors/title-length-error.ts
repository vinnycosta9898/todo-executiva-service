export class TitleLengthError extends Error{
    constructor(){
        super("Title must contain between 2 and 64 characters")
    }
}