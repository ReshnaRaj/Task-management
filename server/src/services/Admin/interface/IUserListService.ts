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
    updateTask(
        id: string,
        updates: Partial<Pick<ITask, "title"|"description"|"priority"|"status"|"dueDate">> & { assignedTo?: string | null }
    ): Promise<{ message: string; task: ITask | null }>
    getTasksForUser(userId: string): Promise<ITask[]>
    updateTaskStatus(taskId: string, userId: string, status: "todo" | "in-progress" | "in-review" | "done"): Promise<{ message: string; task: ITask | null }>
}