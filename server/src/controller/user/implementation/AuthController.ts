import { Request, Response, NextFunction } from "express";
import { IUserAuthController } from "../interface/IUserAuthController";
import { IUserService } from "../../../services/user/interface/IUserService";
import { HttpStatus } from "../../../constants/status.constants";
export class UserAuthController implements IUserAuthController {
  constructor(private _userService: IUserService) {}
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const response = await this._userService.register(name, email, password);
      res.status(HttpStatus.OK).json({ message: response.message });
    } catch (error) {
      next(error);
    }
  }
  async googleLogin(req:Request,res:Response,next:NextFunction):Promise<void>{
    try {
       const { name, email} = req.body;
          const response = await this._userService.googleLogin(name, email);
          res.status(HttpStatus.OK).json({message:response.message})
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const response = await this._userService.login(email, password);
      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(HttpStatus.OK).json({
        message: response.message,
        user: response.user,
        accessToken: response.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
  async generateRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;
      const accessToken = await this._userService.generateRefreshToken(
        refreshToken
      );
      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }
}
