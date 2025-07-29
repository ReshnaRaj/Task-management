// A custom error class called HttpError that extends JavaScript’s built-in Error class.
//  This is useful for handling errors with a custom status code
// Error.captureStackTrace(...) helps capture the exact place in code where the error was 
// created — useful for debugging.
export class HttpError extends Error{
    statusCode:number;
    constructor(message:string,statusCode:number){
        super(message)
        this.statusCode=statusCode
        Error.captureStackTrace(this,this.constructor)
    }
}
export const createHttpError=(statusCode:number,message:string)=>{
    return new HttpError(message,statusCode)
}