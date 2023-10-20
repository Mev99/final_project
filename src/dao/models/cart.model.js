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
})
cartSchema.plugin(mongooseAutoPopulate)
const cartModel = model('carts', cartSchema)

export default cartModel