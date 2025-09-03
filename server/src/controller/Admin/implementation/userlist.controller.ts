import { Request, Response, NextFunction } from "express";
import { IUserListController } from "../interface/IUserListController";
import { IUserListService } from "../../../services/Admin/interface/IUserListService";
import { HttpStatus } from "../../../constants/status.constants";
export class UserListController implements IUserListController {
  constructor(private _userList: IUserListService) { }
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      //  need to return the list of users
      const response = await this._userList.getAllUsers();

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
      console.log(req.body, "create task body params")
      const { title, description, priority, status, dueDate, assignedTo } = req.body
      const response = await this._userList.createTaskForUser(title, description, priority, status, dueDate, assignedTo)
      res.status(200).json({
        message: response.message,
        task: response.task,
      });
    } catch (error) {
      next(error);
    }
  }
  async getTaskList(req: Request,
    res: Response,
    next: NextFunction) {
      try {
        const response=await this._userList.getTaskList();
        console.log("controller get task list",response)
        res.status(HttpStatus.OK).json({message:"Retrieve all Tasks",response})
      } catch (error) {
        
      }

  }
  async getTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const task = await this._userList.getTask(id);
      if (!task) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "Task not found" });
        return;
      }
      res.status(HttpStatus.OK).json({ message: "Retrieve Task", task });
    } catch (error) {
      next(error);
    }
  }
}
