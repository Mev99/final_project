import { Router } from "express";
import productController from "../controllers/productController.js";

const productRouter = Router()

productRouter.get("/:limit?/:page?/:sort?/:query?", productController.getProducts)

productRouter.put('/:uid?', productController.updateMany)


export default productRouter