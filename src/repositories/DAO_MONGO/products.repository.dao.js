import { ProductModel } from "../models/products.model.js";
import mongoose from "mongoose";

class ProductRepository {
    constructor() {
        this.productModel = ProductModel;
    }

    createProduct = async ({ title, description, code, price, stock, category, thumbnail }) => {
        try {
            return await this.productModel.create({
                title,
                description,
                code,
                price,
                stock,
                category,
                thumbnail,
            });
        } catch (error) {
            throw new Error(`Error en el repository (createProduct): ${error.message}`);
        }
    };

    getAllProducts = async (query = {}, options = { page: 1, limit: 10 }) => {
        try {
            const result = await this.productModel.paginate(query, options);

            result.docs = result.docs.map(doc => doc.toObject());

            return result;
        } catch (error) {
            throw new Error(`Error en el repository (getAllProducts): ${error.message}`);
        }
    };

    getProductById = async (_id) => {
        try {
            return await this.productModel.findById(_id).lean();
        } catch (error) {
            throw new Error(`Error en el repository (getProductById): ${error.message}`);
        }
    };

    modifyProductById = async (_id, updateData) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new Error("ID no válido de MongoDB");
            }
            const existingProduct = await this.productModel.findById(_id);
            if (!existingProduct) {
                return null;
            }

            await this.productModel.updateOne({ _id }, updateData);

            return await this.productModel.findById(_id).lean(); 
        } catch (error) {
            throw new Error(`Error en el repository (modifyProductById): ${error.message}`);
        }
    };

    deleteProductById = async (_id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new Error("ID no válido de MongoDB");
            }
            const existingProduct = await this.productModel.findById(_id);
            if (!existingProduct) {
                return null;
            }
            await this.productModel.findByIdAndDelete(_id);
            return existingProduct.toObject(); 
        } catch (error) {
            throw new Error(`Error en el repository (deleteProductById): ${error.message}`);
        }
    };
}

export { ProductRepository };
