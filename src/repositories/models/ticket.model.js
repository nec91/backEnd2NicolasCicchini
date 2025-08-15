import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const ticketsCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    }
}, { timestamps: false, versionKey: false });

export const TicketModel = mongoose.model(ticketsCollection, ticketSchema);
