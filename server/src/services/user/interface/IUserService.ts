import { LoginDTO } from "../../../dto/login.dto";

export interface IUserService{
    register(name:string,email:string,password:string):Promise<{message:string}>;
    googleLogin(name:string,email:string):Promise<LoginDTO>;
    login(email:string,password:string):Promise<LoginDTO>;
    generateRefreshToken(token:string):Promise<string>

}