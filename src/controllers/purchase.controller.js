import Randomstring from "randomstring"
import nodemailer from "nodemailer"

import { productService } from "../repository/app.js"
import cartModel from "../dao/models/cart.model.js"

import UserDto from "../dao/DTOs/user.dto.js"
import ProductDto from "../dao/DTOs/product.dto.js"

import Ticket from "../dao/classes/ticket.mongo.js"
const ticketService = new Ticket()

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'matiayesa99@gmail.com',
        pass: process.env.EMAIL_PASS
    }
})

async function purchase(req, res, next) {
    try {
        const cartId = req.user.cart
        const getCart = await cartModel.findById(cartId)

        // * Filtramos que productos tiene stock y cuales no
        const productsInCart = getCart.products
        const productsWithStock = productsInCart.filter(item => item.product.stock.stock_available)
        const productsWithoutStock = productsInCart.filter(item => !item.product.stock.stock_available)

        // * Sumamos el precio de los que si hay stock
        const addPrice = productsWithStock.reduce((total, item) => {
            const productPrice = item.product.price
            const productQuantity = item.quantity
            return total + productPrice * productQuantity
        }, 0)



        // * Iteramos sobre los que tienen stock para sacarles del stock la cantidad comprada, ademas de confirmar que haya suficiente stock para la cantidad solicitada, y luego actualizamos en la DB el stock
        if (productsWithStock.length !== 0) {

            productsWithStock.forEach(async (item) => {
                try {
                    const productId = item.product._id
                    const quantityToPurchase = item.quantity
                    const getProduct = await productService.getById(productId)

                    if (getProduct.stock.stock_ammount >= quantityToPurchase) {
                        getProduct.stock.stock_ammount -= quantityToPurchase

                        const updateProductInDB = await productService.put({ _id: productId }, getProduct)

                    } else {
                        console.log(`Not enough stock available for product: ${getProduct.product}`)
                    }

                } catch (error) {
                    console.error(error)
                }

            })

            // * variables que voy a usar en los otros middleware
            req.products = productsWithStock
            req.productsNoStock = productsWithoutStock
            req.totalPrice = addPrice

            // TODO: Llamamos al siguiente middleware (no se como hacer para esperar la promesa de ' productsWithStock.forEach ')
            next()
        } else {
            return res.status(400).send('No products with stock in your cart, sorry!')
        }

    } catch (error) {
        console.error(error)
    }
}

async function ticketCreation(req, res, next) {
    try {
        const randomCode = Randomstring.generate(5)
        const dateTime = new Date()
        const price = req.totalPrice
        const purchaserMail = new UserDto(req.user).email

        const createTicket = await ticketService.create({
            code: randomCode,
            purchase_datetime: dateTime,
            amount: price,
            purchaser: purchaserMail
        })

        next()
    } catch (error) {
        console.error(error)
    }
}



async function nodemail(req, res) {
    try {
        let products = req.products
        let productsWithNoStock = req.productsNoStock
        let totalPrice = req.totalPrice

        let html = `<h1>Purcharse</h1>
        <h2>Name: ${req.user.first_name}</h2>
        <h2>Email: ${req.user.email}</h2>
        <h2>Total: ${totalPrice}</h2>
        <h1>Products</h1>`

        products.forEach(e => {
            html += `<h2>Product: ${e.product.product}</h2>
          <h2>Quantity: ${e.quantity}</h2> 
          <h2>Price: ${e.product.price}</h2>`
        })

        const sendEmail = await transport.sendMail({
            from: 'CoderHouse Backend <matiayesa99@gmail.com>',
            to: req.user.email,
            subject: 'Purcharse',
            html
        })

        if (!sendEmail) return res.send({ status: 'error', error: 'email not sent' })

        res.send({ status: 'Email sent', productsWithNoStock, name: req.user.first_name, email: req.user.email })
    } catch (error) {
        console.error(error)
    }
}

export default {
    purchase,
    ticketCreation,
    nodemail
}