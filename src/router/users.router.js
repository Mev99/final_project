import { Router } from "express";
import passport from "passport";

import userController from "../controllers/user.controller.js";

const userRouter = Router()

// USER REGISTER
userRouter.get('/register', async (req, res) => {
    res.render('register')
})

userRouter.post("/register", passport.authenticate("register", { failureRedirect: "/user/register" }), async (req, res) => {

    const { first_name, last_name, email, age, password } = req.body
    console.log(req.body)

    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send('missing information');
    }


    // res.write({payload: createUser})
    res.redirect("http://localhost:8080/user/login")
    // res.send({ status: "success", payload: createUser });
})


//USER LOGIN
userRouter.get('/login', async (req, res) => {
    res.render('login')
})

userRouter.post("/login", passport.authenticate("login", { failureRedirect: "/user/login" }), async (req, res) => {
    if (!req.session.user) {
        return res.status(400).send("Usuario no encontrado")
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age
    }
    res.send({ status: "success", payload: req.user })
}
)



//USER 
userRouter.get('/', userController.getAllUsers)

userRouter.get('/:uid', userController.getUser)

userRouter.put("/:uid", userController.putUser)

userRouter.delete("/:uid", userController.deleteUser)

export default userRouter