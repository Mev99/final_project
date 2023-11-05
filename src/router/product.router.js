import { Router } from "express";
// * CONTROLLER
import productController from "../controllers/product.controller.js";
// * AUTH middleware
import auth from "../middleware/middleware.js";

const productRouter = Router()


// ! Los productos no se renderizan en 'products.handlebars'.
productRouter.get("/:limit?/:page?/:sort?/:query?",
    productController.getProducts)

// * ADMIN ONLY update product
productRouter.put('/:uid?', auth.checkAuthenticated, auth.authorizationAdmin,
    productController.updateMany)

// * ADMIN ONLY create product
productRouter.post('/', auth.checkAuthenticated, auth.authorizationAdmin,
    productController.postProduct)

// * ADMIN ONLY delete product
productRouter.delete('/:pid', auth.checkAuthenticated, auth.authorizationAdmin,
    productController.deleteProduct)

export default productRouter