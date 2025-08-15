import mongoose from "mongoose";

const petsCollection = 'pets'

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
}, { timestamps: true });

export const petModel = mongoose.model(petsCollection, petSchema);
