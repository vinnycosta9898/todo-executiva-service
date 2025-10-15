export class PasswordLengthError extends Error{
    constructor(){
        super("Password length must be between 8 and 14 characters")
    }
}