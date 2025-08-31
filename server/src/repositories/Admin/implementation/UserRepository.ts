import { IUserRepository } from "../interface/IUserRepository";
import { IUser,UserModel } from "../../../models/user.model";
import { TaskModel } from "../../../models/task.model";
 

export class UserRepositoryImpl implements IUserRepository {
  async findAll(): Promise<IUser[]> {
    return await UserModel.find({ role: "user" }); // only developers
  }

  async findById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async createTaskForUser(
    userId: string,
    title: string,
    description: string
  ): Promise<{ message: string }> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    await TaskModel.create({
      userId,
      title,
      description,
      status: "Pending",
      priority: "Medium",
      dueDate: new Date(),
    });

    return { message: "Task assigned successfully" };
  }
}
