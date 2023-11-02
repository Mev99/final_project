import { Router } from "express";
import passport from "passport";
import userController from "../controllers/user.controller.js";
import auth from '../middleware/middleware.js'

const userRouter = Router()


// USER PASSPORT LOGIN
userRouter.get('/login', auth.checkNotAuthenticated, userController.getLogin)

userRouter.post("/login", auth.checkNotAuthenticated, passport.authenticate("login", {
    failureRedirect: "/user/login",
    successRedirect: "/user/current" }), userController.postLogin)

    
// USER PASSPORT REGISTER
userRouter.get('/register', auth.checkNotAuthenticated, userController.getRegister)

userRouter.post("/register", auth.checkNotAuthenticated, passport.authenticate("register", {
    failureRedirect: "/user/register",
    successRedirect: "/user/login" }), userController.postRegister)


// USER 
userRouter.get('/', userController.getAllUsers)

userRouter.put("/:uid", userController.putUser)

userRouter.delete("/:uid", userController.deleteUser)

userRouter.get("/current", auth.checkAuthenticated, userController.getCurrent)

export default userRouter