import cartModel from '../models/cart.model.js'

export default class Cart {
    
    get = async (cartId) => {
        try {
            let data = await cartModel.find({ _id: cartId })
            return data
        } catch (error) {
            console.error(error)
        }
    }

    put = async (cartId, productId, quantityDesired) => {
        try {
            const addProduct = await cartModel.findByIdAndUpdate({ _id: cartId }, { $push: { products: { product: productId, quantity: quantityDesired } } })
            return addProduct
        } catch (error) {
            console.error(error)
        }
    }

    putQuantity = async (cartId, productId, bodyData) => {
        const itemQuantity = Object.values(bodyData)
        try {
            const result = await cartModel.findOneAndUpdate({ _id: cartId, "products.product": productId }, { $set: { "products.$.quantity": itemQuantity[0] } })
            return result
        } catch (error) {
            console.error(error)
        }
    }

    deleteProduct = async (cartId, productId) => {
        try {
            const updateCart = await cartModel.updateOne({ _id: cartId }, { $pull: { products: { product: productId } } })
            return updateCart
        } catch (error) {
            console.error(error)
        }
    }

    clearCart = async (cartId) => {
        try {
            const deleteAllCart = await cartModel.updateMany({ _id: cartId }, { $set: { products: [] } })
            return deleteAllCart
        } catch (error) {
            console.error(error)
        }
    }

}