import { userModel } from "../models/users.model.js";

class UsersRepository {
    constructor() {
        this.userModel = userModel;
    }

    createUser = async (userData) => {
        try {
            return await this.userModel.create(userData);
        } catch (error) {
            throw new Error(`Error creando usuario: ${error.message}`);
        }
    };

    findById = async (id) => {
        try {
            return await this.userModel.findById(id);
        } catch (error) {
            throw new Error(`Error buscando usuario por ID: ${error.message}`);
        }
    };

    findByEmail = async (email) => {
        try {
            return await this.userModel.findOne({ email });
        } catch (error) {
            throw new Error(`Error buscando usuario por email: ${error.message}`);
        }
    };

    updateUser = async (id, updateData) => {
        try {
            return await this.userModel.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error(`Error actualizando usuario: ${error.message}`);
        }
    };

    insertMany = async (rows) => {
        try {
            return await this.userModel.insertMany(rows, { ordered: false });
        } catch (err) {
            throw new Error(`Error insertando usuarios: ${err.message}`);
        }
    };
}

export { UsersRepository };