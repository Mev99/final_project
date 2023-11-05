import Cart from "../dao/classes/cart.mongo.js"

const cartService = new Cart()

async function getCart(req, res) {
    try {
        let cartId = req.user.cart
        let cart = await cartService.get(cartId)

        res.send({ result: 'success', payload: { cart } })
    } catch (error) {
        console.error(error)
    }
}

async function addProductToCart(req, res) {
    try {
        const cartId = req.user.cart
        console.log(cartId)

        const productId = req.params.pid    
        console.log(productId)
        
        const quantityDesired = req.body | 1
        console.log(quantityDesired)

        const addProduct = await cartService.put(cartId, productId, quantityDesired)

        res.send({ payload: addProduct })

    } catch (error) {
        console.error(error)
    }
}

async function putProductQuantity(req, res) {
    const cartId = req.params.cid
    const productId = req.params.pid
    const bodyData = req.body

    try {
        const result = await cartService.putQuantity(cartId, productId, bodyData)

        res.send({ payload: result })
    } catch (error) {
        console.error(error)
    }
}

async function deleteProductFromCart(req, res) {
    const cartId = req.params.cid
    const productId = req.params.pid
    try {
        const updateCart = await cartService.deleteProduct(cartId, productId)

        res.send({ payload: updateCart })
    } catch (error) {
        console.error(error)
    }
}

async function deleteAllProductsFromCart(req, res) {
    const cartId = req.params.cid
    try {
        const deleteAllCart = await cartService.clearCart(cartId)

        res.send({ payload: { deleteAllCart } })
    } catch (error) {
        console.error(error)
    }
}

export default {
    getCart,
    deleteProductFromCart,
    deleteAllProductsFromCart,
    addProductToCart,
    putProductQuantity
}