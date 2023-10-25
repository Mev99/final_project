import Products from "../dao/classes/product.mongo.js"

const productService = new Products()

async function getProducts(req, res) {
    try {
        let limitParam = req.params.limit || 10
        let pageParam = req.params.page || 1
        let sortParam = req.params.sort || 0
        let queryUrl = req.query || null

        const findProducts = await productService.get(queryUrl, limitParam, pageParam, sortParam)

        console.log(findProducts)

        // res.send({ payload: findProducts})
        res.render('products', { findProducts })
    } catch (error) {
        console.log(error)
    }

}

async function updateMany(req, res) {
    try {
        const queryId = req.query
        const data = req.body

        const updateAll = await productService.put(queryId, data)

        res.send({ result: "success", payload: updateAll })
    } catch (error) {
        console.log(error)
    }
}

export default { getProducts, updateMany }