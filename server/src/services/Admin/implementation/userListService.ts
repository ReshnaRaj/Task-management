import { ITask,TaskModel } from "../../../models/task.model";
import { IUser, UserModel } from "../../../models/user.model";
import { IUserListService } from "../interface/IUserListService";
import { IBaseRepository } from "../../../repositories/Base/interface/IBaseRepository";

export class UserListService implements IUserListService {
  constructor(private _userListRepository: IBaseRepository<IUser>) { }
  async getAllUsers(): Promise<{ id: string; name: string; email: string }[]> {
    const users = await this._userListRepository.find({ role: "user" })
    return users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    }));
  }
  async createTaskForUser(
    title: string,
    description: string,
    priority: string,
    status: string,
    dueDate: string,
    assignedTo?: string
  ): Promise<{ message: string, task: any }> {
     
    let user = null;
    if (assignedTo && assignedTo.trim() !== "") {
      user = await this._userListRepository.findById(assignedTo);
      if (!user || user.role !== "user") {
        throw new Error("Invalid user. Task can only be assigned to a developer.");
      }
    }


    const task = await TaskModel.create({
      title,
      description,
      priority,
      status,
      dueDate: new Date(dueDate),
      assignedTo: user ? user._id : null,

    });
    return { message: `Task Created`, task };
  }
  async getTaskList():Promise<ITask[]>{
    const tasks=await TaskModel.find({})
    return tasks;
  }
}
