import mongoose from "mongoose";

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Carts", default: null },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    pets: { type: [mongoose.Schema.Types.ObjectId], ref: "pets", default: []}
})

export const userModel = mongoose.model(userCollection, userSchema)