import { IUser, UserModel } from "../../../models/user.model";

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null>;
  createTaskForUser(
    userId: string,
    title: string,
    description: string
  ): Promise<{ message: string }>;
}
