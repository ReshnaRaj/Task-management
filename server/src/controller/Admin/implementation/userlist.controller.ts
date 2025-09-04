import { Request, Response, NextFunction } from "express";
import { IUserListController } from "../interface/IUserListController";
import { IUserListService } from "../../../services/Admin/interface/IUserListService";
import { HttpStatus } from "../../../constants/status.constants";
import { AuthRequest } from "../../../middleware/auth.middleware";
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
  async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.body;
      const { title, description, priority, status, dueDate, assignedTo } = req.body;
      const response = await this._userList.updateTask(id, {
        title,
        description,
        priority,
        status,
        dueDate,
        assignedTo,
      });
      res.status(HttpStatus.OK).json({ message: response.message, task: response.task });
    } catch (error) {
      next(error);
    }
  }

  async getTasksForUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "User not authenticated" });
        return;
      }
      const tasks = await this._userList.getTasksForUser(userId);
      res.status(HttpStatus.OK).json({ message: "User tasks retrieved", tasks });
    } catch (error) {
      next(error);
    }
  }

  async updateTaskStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "User not authenticated" });
        return;
      }
      
      const { taskId, status } = req.body;
      if (!taskId || !status) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: "Task ID and status are required" });
        return;
      }

      const response = await this._userList.updateTaskStatus(taskId, userId, status);
      res.status(HttpStatus.OK).json({ message: response.message, task: response.task });
    } catch (error) {
      next(error);
    }
  }
}
