import passport from "passport";
import local from "passport-local"
import UserModel from "../dao/mongo/models/user.model.js";
import CartModel from "../dao/mongo/models/cart.model.js";
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
                    let cartTest = await CartModel.create({})
                    console.log(cartTest)
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
                        cart: cartTest._id,
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
}

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
            return done(null, false);
        }

        if (!isValidatePassword(user.password, password)) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}))

export default initializePassport