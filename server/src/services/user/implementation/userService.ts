import { LoginDTO } from "../../../dto/login.dto";
import { IUser } from "../../../models/user.model";
import { IBaseRepository } from "../../../repositories/Base/interface/IBaseRepository";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../../utils/jwt";
import { comparePassword, hashPassword } from "../../../utils/check.Password";
import { IUserService } from "../interface/IUserService";
import { createHttpError } from "../../../utils/http.errors";
import { HttpStatus } from "../../../constants/status.constants";
import { Messages } from "../../../constants/message.constants";

export class UserService implements IUserService{
    constructor(private _userRepository:IBaseRepository<IUser>){}

    async register(name: string, email: string, password: string): Promise<{ message: string }> {
            const existingUser = await this._userRepository.findOne({ email });
            if(existingUser){
               throw createHttpError(HttpStatus.CONFLICT,Messages.USER_EXIST)
            }
              const hashedPassword = await hashPassword(password);
              await this._userRepository.create({name,email,password:hashedPassword})
               return {message: Messages.SIGNUP_SUCCESS}


    }
    async login(email: string, password: string): Promise<LoginDTO> {
         const user = await this._userRepository.findOne({ email });
         console.log(user,"checks userss")
          if (!user) {
          throw createHttpError(HttpStatus.BAD_REQUEST,Messages.USER_NOT_FOUND)
        }
          const validPassword = await comparePassword(password, user?user.password:"null");

        if (!validPassword) {
           throw createHttpError(HttpStatus.BAD_REQUEST,Messages.INVALID_CREDENTIALS)
        }
        const accessToken=generateAccessToken(user?.id.toString())
          const refreshToken = generateRefreshToken(user?.id.toString());
           return {
            message: Messages.LOGIN_SUCCESS,
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
            throw createHttpError(HttpStatus.UNAUTHORIZED, Messages.INVALID_TOKEN)
        }

        const accessToken = generateAccessToken(decoded?decoded.id:"null")

        return accessToken;
    };
}