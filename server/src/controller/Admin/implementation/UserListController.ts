import { Request,Response,NextFunction } from "express";
import { IUserListController } from "../interface/IUserListController";
export class UserListController implements IUserListController{
    async getAllUsers(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            res.status(200).json({message:"get all users"});
        }
        catch (error) {
            next(error);
        }
    }
    async createTaskForUser(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            res.status(200).json({message:"create task for user"});
        }
        catch (error) {
            next(error);
        }
    }
}