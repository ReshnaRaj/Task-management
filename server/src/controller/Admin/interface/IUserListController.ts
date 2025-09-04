import { NextFunction,Response,Request } from "express";
import { AuthRequest } from "../../../middleware/auth.middleware";
export interface IUserListController{
    getAllUsers(req:Request,res:Response,next:NextFunction):Promise<void>;
    createTaskForUser(req:Request,res:Response,next:NextFunction):Promise<void>;
    getTaskList(req:Request,res:Response,next:NextFunction):Promise<void>;
    getTask(req:Request,res:Response,next:NextFunction):Promise<void>;
    updateTask(req:Request,res:Response,next:NextFunction):Promise<void>;
    getTasksForUser(req:AuthRequest,res:Response,next:NextFunction):Promise<void>;
    updateTaskStatus(req:AuthRequest,res:Response,next:NextFunction):Promise<void>;
}