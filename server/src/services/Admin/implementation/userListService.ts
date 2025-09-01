import { TaskModel } from "../../../models/task.model";
import { IUser, UserModel } from "../../../models/user.model";
import { IUserListService } from "../interface/IUserListService";
import { IBaseRepository } from "../../../repositories/Base/interface/IBaseRepository";

export class UserListService implements IUserListService {
  constructor(private _userListRepository: IBaseRepository<IUser>) {}
  async getAllUsers(): Promise<{ id: string; name: string; email: string }[]> {
    const users = await this._userListRepository.find({ role: "user" })
    return users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    }));
  }
  async createTaskForUser(
    userId: string,
    title: string,
    description: string
  ): Promise<{ message: string }> {
    const user = await UserModel.findById(userId);

    if (!user || user.role !== "user") {
      throw new Error(
        "Invalid user. Task can only be assigned to a developer."
      );
    }

    await TaskModel.create({
      title,
      description,
      priority: "medium", // default, can be extended
      status: "open",
      dueDate: new Date(), // set default, or accept from input
      assignedTo: user._id,
      createdBy: user._id, // Or adminId (if available in session)
    });

    return { message: `Task assigned to ${user.name}` };
  }
}
