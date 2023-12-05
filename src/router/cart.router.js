import { Router } from "express";
// * CONTROLLERS
import cartController from "../controllers/cart.controller.js";
import purchaseController from '../controllers/purchase.controller.js'
// * AUTH middleware
import auth from '../middleware/middleware.js'

const cartRouter = Router()

// * GET CART
cartRouter.get('/', auth.checkAuthenticated, auth.authorizationUser,
    cartController.getCart)

// * ADD PRODUCTS TO CART
cartRouter.put('/add_product/:pid', auth.authorizationUser, auth.checkPremiumAddToCart,
    cartController.addProductToCart)

// * UPDATE QUANTITY OF 'X' PRODUCT
cartRouter.put('/:cid/product/:pid', auth.authorizationUser, auth.checkPremiumAddToCart,
    cartController.putProductQuantity)

// * DELETE STUFF FROM CART
cartRouter.delete('/:cid/products/:pid', auth.authorizationUser,
    cartController.deleteProductFromCart)

// * DELETE ALL 
cartRouter.delete('/:cid', auth.authorizationUser,
    cartController.deleteAllProductsFromCart)

// * PURCHASE
cartRouter.get('/purchase', auth.checkAuthenticated, auth.authorizationUser,
    purchaseController.purchase, purchaseController.ticketCreation, purchaseController.nodemail)

export default cartRouter