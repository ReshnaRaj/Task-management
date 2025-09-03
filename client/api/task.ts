import { privateAxios } from "./axiosInstance"
export const getUsers = async () => {
  try {

    const res = await privateAxios.get("/task/get-users")
    // console.log(res,"response of get users....")
    return res;
  } catch (error) {
    console.log(error, "error in getting user data")
  }
}
export const createTask = async (taskData: {
  assignedTo: string;
  title: string;
  description: string;
  priority?: string;
  status?: string;
  dueDate?: string;
}) => {
  try {
    const res = await privateAxios.post("/task/create-task", taskData);

    return res;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }

}
export const getTaskList = async () => {
  try {
    const res = await privateAxios.get("/task/get-taskList")
    console.log(res, "get task from the backend")
    return res
  } catch (error) {

  }
}