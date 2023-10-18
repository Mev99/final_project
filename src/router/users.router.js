import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.get('/', userController.getAllUsers)

userRouter.get('/:uid', userController.getUser)

userRouter.post('/', userController.postUser)

userRouter.put("/:uid", userController.putUser)

userRouter.delete("/:uid", userController.deleteUser)

export default userRouter