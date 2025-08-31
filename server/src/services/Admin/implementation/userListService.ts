import { TaskModel } from "../../../models/task.model";
import { UserModel } from "../../../models/user.model";
import { IUserListService } from "../interface/IUserListService";

export class UserListService implements IUserListService{
      async getAllUsers(): Promise<{ id: string; name: string; email: string }[]> {
    const users = await UserModel.find({ role: "user" }).select("_id name email");
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
      throw new Error("Invalid user. Task can only be assigned to a developer.");
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