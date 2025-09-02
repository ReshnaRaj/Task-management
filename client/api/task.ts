import {privateAxios} from "./axiosInstance"
export const getUsers=async()=>{
    try {
        
        const res=await privateAxios.get("/task/get-users")
        // console.log(res,"response of get users....")
        return res;
    } catch (error) {
        console.log(error,"error in getting user data")
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
    console.log(res,"response from backend")
    return res.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }

}