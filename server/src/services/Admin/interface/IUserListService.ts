import { IUser } from "../../../models/user.model";

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
    getTaskList():Promise<IUser[]>
}