import { Router } from "express";
import passport from "passport";
// * CONTROLLERS
import userController from "../controllers/user.controller.js";
// * AUTH middleware
import auth from '../middleware/middleware.js'

const userRouter = Router()


// * USER PASSPORT LOGIN
userRouter.get('/login', auth.checkNotAuthenticated,
    userController.getLogin)

userRouter.post("/login", auth.checkNotAuthenticated, passport.authenticate("login", {
    failureRedirect: "/user/login",
    successRedirect: "/user/current"
}), userController.postLogin)

// * USER PASSPORT REGISTER
userRouter.get('/register', auth.checkNotAuthenticated, userController.getRegister)

userRouter.post("/register", auth.checkNotAuthenticated, passport.authenticate("register", {
    failureRedirect: "/user/register",
    successRedirect: "/user/login"
}), userController.postRegister)

// * USER routes ADMIN ONLY
userRouter.get('/', auth.authorizationAdmin,
    userController.getAllUsers)

// * UPDATE USER
userRouter.put("/:uid", auth.authorizationAdmin,
    userController.putUser)
    
// * DELETE USER
userRouter.delete("/:uid", auth.authorizationAdmin,
    userController.deleteUser)

// * USER PROFILE
userRouter.get("/current", auth.checkAuthenticated,
    userController.getCurrent)

export default userRouter