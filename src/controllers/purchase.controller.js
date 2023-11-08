import Randomstring from "randomstring"
import cartModel from "../dao/models/cart.model.js"
import { productService } from "../repository/app.js"
import UserDto from "../dao/DTOs/user.dto.js"
import Ticket from "../dao/classes/ticket.mongo.js"
const ticketService = new Ticket()

async function purchase(req, res, next) {
    try {
        const cartId = req.user.cart
        const getCart = await cartModel.findById(cartId)

        const productsInCart = getCart.products
        const productsWithStock = productsInCart.filter(item => item.product.stock.stock_available)
        const productsWithoutStock = productsInCart.filter(item => !item.product.stock.stock_available)

        const addPrice = productsWithStock.reduce((total, item) => {
            const productPrice = item.product.price
            const productQuantity = item.quantity
            return total + productPrice * productQuantity
        }, 0)
        req.totalPrice = addPrice

        if (productsWithStock.length !== 0) {

            const promise = productsWithStock.forEach(async (item) => {
                try {
                    const productId = item.product._id
                    const quantityToPurchase = item.quantity
                    const getProduct = await productService.getById(productId)

                    if (getProduct.stock.stock_ammount >= quantityToPurchase) {
                        getProduct.stock.stock_ammount -= quantityToPurchase

                        const updateProductInDB = await productService.put({ _id: productId }, getProduct)
                        console.log(updateProductInDB)
                    } else {
                        console.log(`Not enough stock available for product: ${getProduct.product}`)
                    }

                } catch (error) {
                    console.error(error)
                }

            })

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
        console.log(purchaserMail)
        const createTicket = await ticketService.create({
            code: randomCode,
            purchase_datetime: dateTime,
            amount: price,
            purchaser: purchaserMail
        })

    } catch (error) {
        console.error(error)
    }
}

export default {
    purchase,
    ticketCreation
}