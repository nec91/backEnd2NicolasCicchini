import mongoose from "mongoose"

const CartsCollection = 'Carts'

const CartsSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ]
},
    { timestamps: true, versionKey: false }
)

export const CartModel = mongoose.model(CartsCollection, CartsSchema)