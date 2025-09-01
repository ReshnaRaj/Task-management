import { Request, Response, NextFunction } from "express";
import { IUserListController } from "../interface/IUserListController";
import { IUserListService } from "../../../services/Admin/interface/IUserListService";
import { HttpStatus } from "../../../constants/status.constants";
export class UserListController implements IUserListController {
  constructor(private _userList: IUserListService) {}
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      //  need to return the list of users
      const response = await this._userList.getAllUsers();
      console.log(response, "response");
      res.status(HttpStatus.OK).json({ message: "get all users", response });
    } catch (error) {
      next(error);
    }
  }
  async createTaskForUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(200).json({ message: "create task for user" });
    } catch (error) {
      next(error);
    }
  }
}
