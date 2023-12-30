import { Router } from "express";
import passport from "passport";
// * CONTROLLERS
import userController from "../controllers/user.controller.js";
// * AUTH middleware
import auth from '../middleware/middleware.js'
import { upload } from "../utils.js";

const userRouter = Router()


// * USER PASSPORT REGISTER
userRouter.get('/register', auth.checkNotAuthenticated, userController.getRegister)

userRouter.post("/register", auth.checkNotAuthenticated, passport.authenticate("register", {
    failureRedirect: "/user/register",
    successRedirect: "/user/login"
}))

// * USER PASSPORT LOGIN
userRouter.get('/login', auth.checkNotAuthenticated,
    userController.getLogin)

userRouter.post("/login", auth.checkNotAuthenticated, passport.authenticate("login", {
    failureRedirect: "/user/login",
    successRedirect: "/user/current"
}))

// * USER routes ADMIN ONLY
userRouter.get('/', auth.checkAuthenticated, auth.authorizationAdmin,
    userController.getAllUsers)

// * UPDATE USER
userRouter.put("/:uid", auth.checkAuthenticated, auth.authorizationAdmin,
    userController.putUser)

// * DELETE USER
userRouter.delete("/:uid", auth.checkAuthenticated, auth.authorizationAdmin,
    userController.deleteUser)

// * USER PROFILE
userRouter.get("/current", auth.checkAuthenticated,
    userController.getCurrent)

// * CHANGES USER'S ROLE FROM PREMIUM TO USER AND VICEVERSA
userRouter.post("/premium/:uid", auth.checkAuthenticated, 
    userController.changeRole)

//* UPLOAD DOCUMENTS
userRouter.post('/documents', auth.checkAuthenticated, auth.authorizationUser, upload,
    userController.uploadDocument)

export default userRouter