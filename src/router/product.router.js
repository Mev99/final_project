import { Router } from "express";
import productController from "../controllers/product.controller.js";
import auth from "../middleware/middleware.js";

const productRouter = Router()

productRouter.get("/:limit?/:page?/:sort?/:query?", productController.getProducts)

productRouter.put('/:uid?', auth.checkAuthenticated, auth.authorizationAdmin, productController.updateMany)

productRouter.post('/', auth.checkAuthenticated, auth.authorizationAdmin, productController.postProduct)

productRouter.delete('/:pid', auth.checkAuthenticated, auth.authorizationAdmin, productController.deleteProduct)

export default productRouter