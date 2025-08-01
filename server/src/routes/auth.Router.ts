import { Router } from "express";
import { validateRegister } from "../middleware/validation";
import { UserAuthController } from "../controller/user/implementation/AuthController";
import { UserService } from "../services/user/implementation/UserService";
import { BaseRepository } from "../repositories/Base/implementation/base.repository";
import { UserModel, IUser  } from "../models/user.model";
const router = Router()
const userRepository=new BaseRepository<IUser>(UserModel);
const userService=new UserService(userRepository)
const userController=new UserAuthController(userService)
router.post("/register",validateRegister,userController.register.bind(userController))
export default router