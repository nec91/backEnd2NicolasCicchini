import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products'

const productsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false },
        code: { type: String, required: true, index: true },
        price: { type: Number, required: true },
        status: { type: Boolean, defaults: true },
        stock: { type: Number, required: true },
        category: { type: String, required: true, index: true },
        thumbnail: { type: String, required: false }
    },
    { timestamps: true, versionKey: false }
)

productsSchema.plugin(mongoosePaginate)

export const ProductModel = mongoose.model(productsCollection, productsSchema)