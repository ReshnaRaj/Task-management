import { Router } from "express";
import { validateRegister } from "../middleware/validation";
import { UserAuthController } from "../controller/user/implementation/auth.controller";
import { UserService } from "../services/user/implementation/user.service";
import { BaseRepository } from "../repositories/Base/implementation/base.repository";
import { UserModel, IUser } from "../models/user.model";
const router = Router()
const userRepository = new BaseRepository<IUser>(UserModel);
const userService = new UserService(userRepository)
const userController = new UserAuthController(userService)
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication routes
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", validateRegister, userController.register.bind(userController))
router.post("/google-login", userController.googleLogin.bind(userController))
router.post("/login", userController.login.bind(userController))
router.post("/generate-new-token",userController.generateRefreshToken.bind(userController))
export default router