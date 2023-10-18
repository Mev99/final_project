import Express from "express";
import mongoose from "mongoose";
import {engine} from "express-handlebars"
//CONFIG & UTILS
import __dirname from "./utils.js";
import config from "./config/config.js"
//ROUTERs
import userRouter from "./router/users.router.js"
import productRouter from "./router/product.router.js";
import cartRouter from "./router/cart.router.js";


const app = Express()
const mongoURL = config.mongoUrl
const PORT = config.port

app.engine(
    "handlebars",
    engine({
        extname: "handlebars",
        defaultLayout: false,
        layoutsDir: "views/layouts/"
    })
);
app.set("view engine", "handlebars")
app.set("views", __dirname + '/views')
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`at port: ${PORT}`)
})

mongoose.connect(mongoURL)
    .then(() => {
        console.log('connected to DB')
    })
    .catch(error => {
        console.error('error connecting to DB', error)
    })


app.use('/user', userRouter)
app.use('/products', productRouter)
app.use('/cart', cartRouter)