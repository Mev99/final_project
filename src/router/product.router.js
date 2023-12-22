import { Router } from "express";
// * CONTROLLER
import productController from "../controllers/product.controller.js";
// * AUTH middleware
import auth from "../middleware/middleware.js";

const productRouter = Router()


// ! Los productos no se renderizan en 'products.handlebars'.
productRouter.get("/:limit?/:page?/:sort?/:query?",
    productController.getProducts)

// ! Modificar las query de '.getproducts' para poder hacer un getById.
// productRouter.get("byId/:pid", 
//     productController.getById)

// * ADMIN & PREMIUM update product
productRouter.put('/:pid', auth.checkAuthenticated, auth.authorizationAdminAndPremium,
    productController.updateMany)

// * ADMIN & PREMIUM create product
productRouter.post('/', auth.checkAuthenticated, auth.authorizationAdminAndPremium,
    productController.postProduct)

// * ADMIN & PREMIUM delete product
productRouter.delete('/:pid', auth.checkAuthenticated, auth.authorizationAdminAndPremium,
    productController.deleteProduct)

export default productRouter