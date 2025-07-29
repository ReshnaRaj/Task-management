import { Router } from "express";
import { validateRegister } from "../middleware/validation";
import { UserAuthController } from "../controller/user/implementation/AuthController";
import { UserService } from "../services/user/implementation/UserService";
import { UserRepository } from "../repositories/user/implementation/user.repository";
import { UserModel, IUser  } from "../models/user.model";
const router = Router()
const userRepository=new UserRepository<IUser>(UserModel);
const userService=new UserService(userRepository)
const userController=new UserAuthController(userService)
router.post("/register",validateRegister,userController.register.bind(userController))