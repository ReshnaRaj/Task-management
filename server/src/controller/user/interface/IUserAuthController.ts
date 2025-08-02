import { NextFunction, Response, Request } from "express";
export interface IUserAuthController{
    register(req:Request,res:Response,next:NextFunction):Promise<void>;
    login(req:Request,res:Response,next:NextFunction):Promise<void>;
    googleLogin(req:Request,res:Response,next:NextFunction):Promise<void>;
    generateRefreshToken(req:Request,res:Response,next:NextFunction):Promise<void>

}