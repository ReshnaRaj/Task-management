import { Router } from "express";
const router = Router();
import { UserListController } from "../controller/Admin/implementation/UserListController";
import { authAdmin } from "../middleware/authMiddleware";
const userListController = new UserListController();
// router.get("/get-users",authAdmin,userListController.getAllUsers);
router.get("/get-users", authAdmin, userListController.getAllUsers.bind(userListController));
router.post("/create-task",authAdmin,userListController.createTaskForUser);
export default router;