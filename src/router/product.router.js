import { Router } from "express";
import productController from "../controllers/product.controller.js";

const productRouter = Router()

productRouter.get("/:limit?/:page?/:sort?/:query?", productController.getProducts)

productRouter.put('/:uid?', productController.updateMany)

productRouter.post('/', productController.postProduct)

productRouter.delete('/:pid', productController.deleteProduct)

export default productRouter