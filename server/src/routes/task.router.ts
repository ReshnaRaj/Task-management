import { Router } from "express";
const router = Router();
import { UserListController } from "../controller/Admin/implementation/UserListController";
import { authAdmin } from "../middleware/authMiddleware";
// import {TaskModel,ITask} from "../models/task.model"
import { IUser, UserModel } from "../models/user.model";
import { BaseRepository } from "../repositories/Base/implementation/base.repository";
import { UserListService } from "../services/Admin/implementation/userListService";

const userListRepository = new BaseRepository<IUser>(UserModel);
const userListService = new UserListService(userListRepository);
const userListController = new UserListController(userListService);

router.get(
  "/get-users",
  authAdmin,
  userListController.getAllUsers.bind(userListController)
);
router.post(
  "/create-task",
  authAdmin,
  userListController.createTaskForUser.bind(userListController)
);
router.get("/get-taskList",authAdmin,userListController.getTaskList.bind(userListController))
router.get("/get-task/:id", authAdmin, userListController.getTask.bind(userListController))
 

export default router;
