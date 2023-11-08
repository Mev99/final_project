import ProductDto from "../dao/DTOs/product.dto.js";

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async (query, limitParam, pageParam, sortParam) => {
        try {
            let result = await this.dao.get(query, limitParam, pageParam, sortParam)
            return result
        } catch (error) {
            console.error(error)
        }
    }
    
    getById = async (uid) => {
        try {
            let result = await this.dao.getById(uid)
            return result
        } catch (error) {
            console.error(error)
        }
    }

    put = async (queryId, data) => {
        try {
            let update = await this.dao.put(queryId, data)
            return update
        } catch (error) {
            console.error(error)
        }
    }

    post = async (data) => {
        try {
            const productDTO = new ProductDto(data)
            let newProduct = await this.dao.post(productDTO)
            return newProduct
        } catch (error) {
            console.error(error)
        }
    }

    delete = async (productId) => {
        try {
            let deleteProduct = await this.dao.delete(productId)
            return deleteProduct
        } catch (error) {
            console.error(error)
        }
    }
}