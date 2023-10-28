import { Router } from "express";
import passport from "passport";

import userController from "../controllers/user.controller.js";

const userRouter = Router()

// USER PASSPORT REGISTER
userRouter.get('/register', userController.getRegister)

userRouter.post("/register", passport.authenticate("register", { failureRedirect: "/user/register" }), userController.postRegister)

// USER PASSPORT LOGIN
userRouter.get('/login', userController.getLogin)

userRouter.post("/login", passport.authenticate("login", { failureRedirect: "/user/login" }), userController.postLogin)


// USER 
userRouter.get('/', userController.getAllUsers)

userRouter.put("/:uid", userController.putUser)

userRouter.delete("/:uid", userController.deleteUser)

userRouter.get("/current", userController.getCurrent)

export default userRouter