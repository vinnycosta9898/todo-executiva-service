export class DescriptionLengthError extends Error{
    constructor(){
        super("Description length must be between 8 and 14 characters")
    }
}