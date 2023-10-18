import productModel from "../dao/mongo/models/product.model.js"

async function getProducts(req, res) {
    try {
        let limitParam = req.params.limit || 10
        let pageParam = req.params.page || 1
        let sortParam = req.params.sort || 0
        let queryUrl = req.query || null
    
        const findProducts = await productModel.paginate(queryUrl, { limit: limitParam, page: pageParam, sort: { price: sortParam } })
    
        res.send({ status: 'success', payload: findProducts })
    } catch (error) {
        console.log(error)
    }

}

async function updateMany(req, res) {
    try {
        const queryId = req.query
        const data = req.body

        const updateAll = await productModel.updateMany(queryId, data)

        res.send({ result: "success", payload: updateAll })
    } catch (error) {
        console.log(error)
    }
}

export default {getProducts, updateMany}