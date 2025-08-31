import { LoginDTO } from "../../../dto/login.dto";
import { IUser } from "../../../models/user.model";
import { IBaseRepository } from "../../../repositories/Base/interface/IBaseRepository";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../utils/jwt";
import { comparePassword, hashPassword } from "../../../utils/check.Password";
import { IUserService } from "../interface/IUserService";
import { createHttpError } from "../../../utils/http.errors";
import { HttpStatus } from "../../../constants/status.constants";
import { Messages } from "../../../constants/message.constants";

export class UserService implements IUserService {
  constructor(private _userRepository: IBaseRepository<IUser>) {}

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<{ message: string }> {
    const existingUser = await this._userRepository.findOne({ email });
     
    if (existingUser) {
      throw createHttpError(HttpStatus.CONFLICT, Messages.USER_EXIST);
    }
    const hashedPassword = await hashPassword(password);
    await this._userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return { message: Messages.SIGNUP_SUCCESS };
  }
  async googleLogin(
    name: string,
    email: string
  ): Promise<LoginDTO> {
    const existingUser = await this._userRepository.findOne({ email }); // `sub` is the Google user ID (used as password fallback)
    if (existingUser) {
      // const token = generateAccessToken(existingUser?.id.toString());
       const accessToken = generateAccessToken((existingUser?._id || "").toString());
  const refreshToken = generateRefreshToken((existingUser?._id || "").toString());
      return {
        message: "Login successful",
        accessToken,
      refreshToken,
         user: {
        id: existingUser._id.toString(),
        name: existingUser.name,
        email: existingUser.email,
        role:existingUser?existingUser.role:"user"
      },
      };
    }
    const newUser = await this._userRepository.create({
      name,
      email,
    });
    // const token = generateAccessToken(newUser._id.toString());
     const newAccessToken  = generateAccessToken((newUser?._id || "").toString());
  const newRefreshToken = generateRefreshToken((newUser?._id || "").toString());
    return {
      message: "User registered with Google",
      accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role:newUser.role?newUser.role:"user"
    },
    };
  }

  async login(email: string, password: string): Promise<LoginDTO> {
    const user = await this._userRepository.findOne({ email });
   
    console.log("login service implementation")
    if (!user) {
      throw createHttpError(HttpStatus.BAD_REQUEST, Messages.USER_NOT_FOUND);
    }
    const validPassword = await comparePassword(
      password,
      user ? user.password : "null"
    );

    if (!validPassword) {
      throw createHttpError(
        HttpStatus.BAD_REQUEST,
        Messages.INVALID_CREDENTIALS
      );
    }
    const accessToken = generateAccessToken(user?.id.toString());
    const refreshToken = generateRefreshToken(user?.id.toString());
    return {
      message: Messages.LOGIN_SUCCESS,
      accessToken,
      refreshToken,
      user: {
        id: user ? user._id.toString() : "null",
        name: user ? user.name : "null",
        email: user ? user.email : "null",
        role:user?user.role:"user"
      },
    };
  }
  async generateRefreshToken(token: string): Promise<string> {
    const decoded = verifyRefreshToken(token);

    if (!decoded) {
      throw createHttpError(HttpStatus.UNAUTHORIZED, Messages.INVALID_TOKEN);
    }

    const accessToken = generateAccessToken(decoded ? decoded.id : "null");

    return accessToken;
  }
}
