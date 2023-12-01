import { productService } from "../repository/app.js"
// import Products from "../dao/classes/product.mongo.js"
// const productService = new Products()

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

// TODO: Make it so if stocks is added to a product that has none, the boolean changes to true
async function updateMany(req, res) {
    try {
        const queryId = req.body
        const data = req.body

        const updateAll = await productService.put(queryId, data)

        res.send({ result: "success", payload: updateAll })
    } catch (error) {
        console.log(error)
    }
}


async function postProduct(req, res) {
    try {
        const data = req.body
        const { role } = req.user

        if (role === 'premium') {
            data.owner = req.user._id
        }

        const newProduct = await productService.post(data)

        res.send({ payload: newProduct })
    } catch (error) {
        console.error(error)
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = req.params.pid
        const { role, _id } = req.user

        if (role === 'premium') {
            const product = await productService.getById(productId)

            if (_id === product.owner) {
                const deleteProduct = await productService.delete(productId)
                return res.send({ payload: deleteProduct })
            }
        }
        const deleteProduct = await productService.delete(productId)

        res.send({ payload: deleteProduct })
    } catch (error) {
        console.error(error)
    }
}

export default { getProducts, updateMany, postProduct, deleteProduct }