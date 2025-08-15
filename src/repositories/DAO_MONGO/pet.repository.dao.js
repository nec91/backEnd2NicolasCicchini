import { petModel } from "../models/pet.model.js";

class PetRepository {
    constructor() {
        this.petModel = petModel;
    }

    insertMany = async (rows) => {
        try {
            return await this.petModel.insertMany(rows, { ordered: false });
        } catch (err) {
            throw new Error(`Error insertando mascotas: ${err.message}`);
        }
    };
}

export { PetRepository };
