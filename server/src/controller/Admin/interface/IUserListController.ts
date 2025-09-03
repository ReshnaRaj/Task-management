import { NextFunction,Response,Request } from "express";
export interface IUserListController{
    getAllUsers(req:Request,res:Response,next:NextFunction):Promise<void>;
    createTaskForUser(req:Request,res:Response,next:NextFunction):Promise<void>;
    getTaskList(req:Request,res:Response,next:NextFunction):Promise<void>;
}