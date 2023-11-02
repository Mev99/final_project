import passport from "passport";
import local from "passport-local"
import UserModel from "../dao/models/user.model.js";
import CartModel from "../dao/models/cart.model.js";
import { createHash, isValidatePassword } from "../utils.js"

const localStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        "register",
        new localStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                const { first_name, last_name, email, age } = req.body;
                try {
                    let user = await UserModel.findOne({ email: username });
                    let createCart = await CartModel.create({})
                    if (user) {
                        console.log("El usuario ya existe");
                        return done(null, false);
                    }

                    if (!first_name || !last_name || !email || !age || !password) {
                        console.log("Faltan campos obligatorios");
                        return done(null, false);
                    }

                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        cart: createCart._id,
                        role: "user"
                    };
                    let result = await UserModel.create(newUser);
                    return done(null, result);
                } catch (error) {
                    return done("Error al obtener el usuario " + error);
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById(id);
        done(null, user);
    });
    
    passport.use('login', new localStrategy({ usernameField: "email" }, async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ email: username });
            if (!user) {
                console.log('user does not check')
                return done(null, false);
            }
            
            const passwordValidation = isValidatePassword(user.password, password)
            if (!passwordValidation) {
                console.log('password does not check')
                return done(null, false);
            }
    
            return done(null, user);
    
        } catch (error) {
            return done(error);
        }
    }))
}


export default initializePassport