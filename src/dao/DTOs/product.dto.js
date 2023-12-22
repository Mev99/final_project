export default class ProductDto {
    constructor(product) {
        this.product = product.product,
        this.category = product.category,
        this.price = product.price,
        this.stock = product.stock,
        this.image = product.image,
        this.owner = product.owner
    }
}