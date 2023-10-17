import { Router } from "express";
import cartModel from "../models/cart.model.js";
const cartRouter = Router()

cartRouter.get('/', async (req, res) => {
  let data = await cartModel.find()

  res.send({ result: 'success', payload: { data } })
})

cartRouter.post('/:pid', async (req, res) => {
  const paramId = req.params.pid
  const addProductToCart = await cartModel.create({
    products: { product: paramId, quantity: 1 }
  })
  console.log(addProductToCart)

  res.send({ result: "success", payload: { addProductToCart } })
})

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid
    const productId = req.params.pid

    const updateCart = await cartModel.updateOne({ _id: cartId }, { $pull: { products: { product: productId } } })

    res.send({ payload: updateCart })
  } catch (error) {
    console.log(error)
  }
})

cartRouter.delete('/:cid', async (req, res) => {
  const cartId = req.params.cid

  const deleteAllCart = await cartModel.updateMany({ _id: cartId }, { $set: { products: [] } })

  res.send({ payload: { deleteAllCart } })
})

cartRouter.put('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid
  const productId = req.params.pid
  const quantityDesired = req.body | 1
  console.log(quantityDesired)


  const addProduct = await cartModel.findByIdAndUpdate({ _id: cartId }, { $push: { products: { product: productId, quantity: quantityDesired } } })

  res.send({ payload: addProduct })
})

cartRouter.put('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid
  const productId = req.params.pid
  const bodyData = req.body
  const itemQuantity = Object.values(bodyData)

  try {
    const result = await cartModel.findOneAndUpdate({ _id: cartId, "products.product": productId }, { $set: { "products.$.quantity": itemQuantity[0] } })

    res.send({ payload: result })
  } catch (error) {
    console.log(error)
  }
})
export default cartRouter