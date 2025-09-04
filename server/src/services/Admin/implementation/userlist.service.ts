import { ITask,TaskModel } from "../../../models/task.model";
import { IUser, UserModel } from "../../../models/user.model";
import { IUserListService } from "../interface/IUserListService";
import { IBaseRepository } from "../../../repositories/Base/interface/IBaseRepository";

export class UserListService implements IUserListService {
  constructor(
    private _userListRepository: IBaseRepository<IUser>,
    private _taskRepository: IBaseRepository<ITask>
  ) { }
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

    const task = await this._taskRepository.create({
      title,
      description,
      priority,
      status,
      dueDate: new Date(dueDate) as unknown as any,
      assignedTo: user ? (user._id as unknown as any) : null,
    } as Partial<ITask>);
    return { message: `Task Created`, task };
  }
  async getTaskList():Promise<ITask[]>{
    const tasks = await this._taskRepository.find({});
    return tasks;
  }
  async getTask(id: string): Promise<ITask | null> {
    const task = await this._taskRepository.findById(id);
    return task;
  }
  async updateTask(
    id: string,
    updates: Partial<Pick<ITask, "title" | "description" | "priority" | "status" | "dueDate">> & {
      assignedTo?: string | null;
    }
  ): Promise<{ message: string; task: ITask | null }> {
    const updatePayload: any = { ...updates };
    if (typeof updates.dueDate === "string") {
      updatePayload.dueDate = new Date(updates.dueDate as unknown as any) as unknown as any;
    }
    if (Object.prototype.hasOwnProperty.call(updates, "assignedTo")) {
      if (updates.assignedTo) {
        const user = await this._userListRepository.findById(updates.assignedTo);
        if (!user || user.role !== "user") {
          throw new Error("Invalid user. Task can only be assigned to a developer.");
        }
        updatePayload.assignedTo = user._id as unknown as any;
      } else {
        updatePayload.assignedTo = null;
      }
    }

    const updated = await this._taskRepository.findByIdAndUpdate(id, updatePayload);
    return { message: "Task Updated", task: updated };
  }

  async getTasksForUser(userId: string): Promise<ITask[]> {
    const tasks = await this._taskRepository.find({ assignedTo: userId });
    return tasks;
  }

  async updateTaskStatus(taskId: string, userId: string, status: "todo" | "in-progress" | "in-review" | "done"): Promise<{ message: string; task: ITask | null }> {
    // First verify that the task is assigned to this user
    const task = await this._taskRepository.findById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    
    // Check if the task is assigned to the requesting user
    if (task.assignedTo?.toString() !== userId) {
      throw new Error("You can only update tasks assigned to you");
    }

    // Update only the status
    const updatedTask = await this._taskRepository.findByIdAndUpdate(taskId, { status });
    return { message: "Task status updated successfully", task: updatedTask };
  }
}
