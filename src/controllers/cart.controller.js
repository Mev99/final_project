import cartModel from "../dao/mongo/models/cart.model.js"

async function getCart(req, res) {
    try {
        let data = await cartModel.find()
        res.send({ result: 'success', payload: { data } })
    } catch (error) {
        console.error(error)
    }
}

async function postProductAndCreateCart(req, res) {
    try {
        const paramId = req.params.pid
        const addProductToCart = await cartModel.create({
            products: { product: paramId, quantity: 1 }
        })
        console.log(addProductToCart)

        res.send({ result: "success", payload: { addProductToCart } })

    } catch (error) {
        console.error(error)
    }
}

async function deleteProductFromCart(req, res) {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid

        const updateCart = await cartModel.updateOne({ _id: cartId }, { $pull: { products: { product: productId } } })

        res.send({ payload: updateCart })
    } catch (error) {
        console.error(error)
    }
}

async function deleteAllProductsFromCart(req, res) {
    try {
        const cartId = req.params.cid

        const deleteAllCart = await cartModel.updateMany({ _id: cartId }, { $set: { products: [] } })

        res.send({ payload: { deleteAllCart } })
    } catch (error) {
        console.error(error)
    }
}

async function putProductToCart(req, res) {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const quantityDesired = req.body | 1
        console.log(quantityDesired)


        const addProduct = await cartModel.findByIdAndUpdate({ _id: cartId }, { $push: { products: { product: productId, quantity: quantityDesired } } })

        res.send({ payload: addProduct })

    } catch (error) {
        console.error(error)
    }
}

async function putProductQuantity(req, res) {
    const cartId = req.params.cid
    const productId = req.params.pid
    const bodyData = req.body
    const itemQuantity = Object.values(bodyData)

    try {
        const result = await cartModel.findOneAndUpdate({ _id: cartId, "products.product": productId }, { $set: { "products.$.quantity": itemQuantity[0] } })

        res.send({ payload: result })
    } catch (error) {
        console.error(error)
    }
}

export default {
    getCart,
    postProductAndCreateCart,
    deleteProductFromCart,
    deleteAllProductsFromCart,
    putProductToCart,
    putProductQuantity
}