import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
import auth from '../middleware/middleware.js'

const cartRouter = Router()

cartRouter.get('/cid', auth.checkAuthenticated, auth.authorizationUser, cartController.getCart)

cartRouter.delete('/:cid/products/:pid', auth.authorizationUser, cartController.deleteProductFromCart)

cartRouter.delete('/:cid', auth.authorizationUser, cartController.deleteAllProductsFromCart)

cartRouter.put('/:cid/products/:pid', auth.authorizationUser, cartController.addProductToCart)

cartRouter.put('/:cid/product/:pid', auth.authorizationUser, cartController.putProductQuantity)

export default cartRouter