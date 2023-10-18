import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const stockSchema = new Schema({
        stock_available: Boolean,
        stock_ammount: Number
}, {_id: false})

const productSchema = new Schema({
    product: String,
    category: String,
    price: Number,
    stock: stockSchema,
    image: [Schema.Types.String]
})
productSchema.plugin(paginate)
const productModel = model('product', productSchema)

export default productModel

/* 
[
            {
                "_id": "64fc9648fab23db9ac795d58",
                "product": "productoJ",
                "category": "B",
                "price": 5,
                "stock": 55,
                "image": "image__productJ.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d5b",
                "product": "productoN",
                "category": "A",
                "price": 10,
                "stock": 10,
                "image": "image__productN.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d56",
                "product": "productoH",
                "category": "Z",
                "price": 20,
                "stock": 60,
                "image": "image__productH.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d57",
                "product": "productoI",
                "category": "A",
                "price": 35,
                "stock": 80,
                "image": "image__productI.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d55",
                "product": "productoG",
                "category": "C",
                "price": 40,
                "stock": 5,
                "image": "image__productG.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d5c",
                "product": "productoZ",
                "category": "A",
                "price": 40,
                "stock": 40,
                "image": "image__productZ.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d4f",
                "product": "productoA",
                "category": "A",
                "price": 50,
                "stock": 10,
                "image": "image__productA.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d50",
                "product": "productoB",
                "category": "A",
                "price": 60,
                "stock": 2,
                "image": "image__productB.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d51",
                "product": "productoC",
                "category": "C",
                "price": 80,
                "stock": 20,
                "image": "image__productC.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d59",
                "product": "productoK",
                "category": "Z",
                "price": 90,
                "stock": 100,
                "image": "image__productK.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d5a",
                "product": "productoM",
                "category": "C",
                "price": 99,
                "stock": 78,
                "image": "image__productM.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d52",
                "product": "productoD",
                "category": "B",
                "price": 100,
                "stock": 50,
                "image": "image__productD.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d53",
                "product": "productoE",
                "category": "B",
                "price": 150,
                "stock": 5,
                "image": "image__productE.jpg"
            },
            {
                "_id": "64fc9648fab23db9ac795d54",
                "product": "productoF",
                "category": "C",
                "price": 166,
                "stock": 3,
                "image": "image__productF.jpg"
            }
        ]
*/