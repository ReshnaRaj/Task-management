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
router.post("/google-login",userController.googleLogin.bind(userController))
router.post("/login",userController.login.bind(userController))
// router.post("/generate-new-token",userController.generateNewToken.bind(userController))
export default router