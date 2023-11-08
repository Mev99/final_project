import { Schema, model } from "mongoose";

const purchaseSchema = new Schema({
    code: String,
    purchase_datetime: Date,
    amount: Number,
    purchaser: String
})

const ticketModel = model('tickets', purchaseSchema)

export default ticketModel