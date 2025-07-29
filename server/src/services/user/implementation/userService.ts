import { LoginDTO } from "../../../dto/login.dto";
import { IUser } from "../../../models/user.model";
import { IUserRepository } from "../../../repositories/user/interface/IUserRepository";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../../utils/jwt";
import { comparePassword, hashPassword } from "../../../utils/checkPassword";
import { IUserService } from "../interface/IUserService";

export class UserService implements IUserService{
    constructor(private _userRepository:IUserRepository<IUser>){}

    async register(name: string, email: string, password: string): Promise<{ message: string }> {
            const existingUser = await this._userRepository.findOne({ email });
            if(existingUser){
                console.log("user exist")
            }
              const hashedPassword = await hashPassword(password);
              await this._userRepository.create({name,email,password:hashedPassword})
               return {message: "signup Success"}


    }
    async login(email: string, password: string): Promise<LoginDTO> {
         const user = await this._userRepository.findOne({ email });
         console.log(user,"checks userss")
          if (!user) {
           console.log("no user exist")
        }
          const validPassword = await comparePassword(password, user?user.password:"null");

        if (!validPassword) {
            console.log("Invalid credentials")
        }
        const accessToken=generateAccessToken(user?.id.toString())
          const refreshToken = generateRefreshToken(user?.id.toString());
           return {
            message: "Login Success",
            accessToken,
            refreshToken,
            user: {
                id: user?user._id.toString():"null",
                name: user?user.name:"null",
                email: user?user.email:"null"
            }
        };
   }
    async generateRefreshToken(token: string): Promise<string> {
        const decoded = verifyRefreshToken(token);

        if (!decoded){
           console.log("invalid token")
        }

        const accessToken = generateAccessToken(decoded?decoded.id:"null")

        return accessToken;
    };
}