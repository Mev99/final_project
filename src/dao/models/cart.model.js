import { Schema, model } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const cartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: "product",
                autopopulate: true
            },
            quantity: Number,
            _id: false
        }]
    }
    // TODO: MAKE A TOTAL AND MAKE IT UPDATE IN EACH CART REQUEST, USER SHOULD KNOW THE TOTAL ON HIS CART AT ALL TIMES NOT WHEN HE JUST MAKES THE PURCHASE.
    // cart_total: Number
})
cartSchema.plugin(mongooseAutoPopulate)
const cartModel = model('carts', cartSchema)

export default cartModel