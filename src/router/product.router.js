import { Router } from "express";
import productModel from "../models/product.model.js";
const productRouter = Router()

productRouter.get("/:limit?/:page?/:sort?/:query?", async (req, res) => {
    let limitParam = req.params.limit || 10
    let pageParam = req.params.page || 1
    let sortParam = req.params.sort || 0
    let queryUrl = req.query || null

    const findProducts = await productModel.paginate(queryUrl, { limit: limitParam, page: pageParam, sort: { price: sortParam } })

    //TO DO: prevLink & nextLink: links a la pagina anterior y posterior respectivamente
    res.send({ status: 'success', payload: findProducts })
})

productRouter.put('/:uid?', async (req, res) => {
    try {
        const queryId = req.query
        const data = req.body

        const updateAll = await productModel.updateMany(queryId, data)

        res.send({ result: "success", payload: updateAll })
    } catch (error) {
        console.log(error)
    }
})


export default productRouter