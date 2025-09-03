import { IUser } from "../../../models/user.model";
import { ITask } from "../../../models/task.model";

export interface IUserListService {
    getAllUsers(): Promise<{ id: string, name: string, email: string }[]>;
    createTaskForUser(
        title: string,
        description: string,
        priority: string,
        status: string,
        dueDate: string,
        assignedTo: string  
    ): Promise<{ message: string; task: any }>;
    getTaskList():Promise<ITask[]>
    getTask(id: string): Promise<ITask | null>
}