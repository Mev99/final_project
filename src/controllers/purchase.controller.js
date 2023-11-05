
async function purchase(req, res) {
    try {
        const cartId = req.params.cid
        console.log(cartId)

    } catch (error) {
        console.error(error)
    }
}

export default {
    purchase
}