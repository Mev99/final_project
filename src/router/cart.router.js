import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const cartRouter = Router()

cartRouter.get('/cid', cartController.getCart)

cartRouter.delete('/:cid/products/:pid', cartController.deleteProductFromCart)

cartRouter.delete('/:cid', cartController.deleteAllProductsFromCart)

cartRouter.put('/:cid/products/:pid', cartController.addProductToCart)

cartRouter.put('/:cid/product/:pid', cartController.putProductQuantity)

export default cartRouter