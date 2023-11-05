import { Schema, model } from "mongoose";

const purchaseSchema = new Schema({
    code: String,
    purchase_datetime: Date,
    amount: Number,
    purchaser: String
})

const purchaseModel = model('purchase', purchaseSchema)

export default purchaseModel