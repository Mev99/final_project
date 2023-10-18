import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const cartRouter = Router()

cartRouter.get('/', cartController.getCart)

cartRouter.post('/:pid', cartController.postProductAndCreateCart)

cartRouter.delete('/:cid/products/:pid', cartController.deleteProductFromCart)

cartRouter.delete('/:cid', cartController.deleteAllProductsFromCart)

cartRouter.put('/:cid/products/:pid', cartController.putProductToCart)

cartRouter.put('/:cid/product/:pid', cartController.putProductQuantity)

export default cartRouter