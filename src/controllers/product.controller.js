import ProductDto from "../dao/DTOs/product.dto.js"
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
        const products = findProducts.docs

        // const filteredProducts = products.map((p) => {
        //     new ProductDto(p)
        // })

        // res.render('products', {products})
        res.send({ products })
    } catch (error) {
        console.log(error)
    }

}

async function getById(req, res) {
    try {
        const { pid } = req.params
        const findProduct = await productService.getById(pid)

        res.send(findProduct)
    } catch (error) {
        console.error(error)
    }
}


async function updateMany(req, res) {
    try {
        const { pid } = req.params
        const data = req.body

        const updateAll = await productService.put(pid, data)

        res.send({ result: "success", payload: updateAll })
    } catch (error) {
        console.log(error)
    }
}


async function postProduct(req, res) {
    try {
        const data = req.body

        if (req.isPremium) {
            data.owner = req.user.email
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
            } else {
                return res.render('forbidden')
            }
        }

        const deleteProduct = await productService.delete(productId)
        
        res.send({ payload: deleteProduct })
    } catch (error) {
        console.error(error)
    }
}

export default { getProducts, getById, updateMany, postProduct, deleteProduct }