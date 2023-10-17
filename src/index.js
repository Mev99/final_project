import Express from "express";
import mongoose from "mongoose";
import userRouter from "./router/users.router.js"
import productRouter from "./router/product.router.js";
import cartRouter from "./router/cart.router.js";

const app = Express()
app.use(Express.json())

app.listen(8080, () => {
    console.log(`listening on what ever port you choose homie`)
})

mongoose.connect("mongodb+srv://Mev:1972@cluster0.kxayelo.mongodb.net/ecommerce?retryWrites=true&w=majority")
    .then(() => {
        console.log('connected to DB')
    })
    .catch(error => {
        console.error('error connecting to DB', error)
    })


app.use('/user', userRouter)
app.use('/products', productRouter)
app.use('/cart', cartRouter)