import { ProductRepository } from "../repositories/DAO_MONGO/products.repository.dao.js";

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  createProduct = async ({ title, description, code, price, stock, category, thumbnail }) => {
    try {
      return await this.productRepository.createProduct({
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnail,
      });
    } catch (error) {
      throw new Error(`Error en el servicio (createProduct): ${error.message}`);
    }
  };

  getAllProducts = async (query = {}, options = { page: 1, limit: 10 }) => {
    try {
      const productsPaginated = await this.productRepository.getAllProducts(query, options);

      return {
        products: productsPaginated.docs,
        pagination: {
          totalDocs: productsPaginated.totalDocs,
          limit: productsPaginated.limit,
          totalPages: productsPaginated.totalPages,
          page: productsPaginated.page,
          pagingCounter: productsPaginated.pagingCounter,
          hasPrevPage: productsPaginated.hasPrevPage,
          hasNextPage: productsPaginated.hasNextPage,
          prevPage: productsPaginated.prevPage,
          nextPage: productsPaginated.nextPage,
        },
      };
    } catch (error) {
      throw new Error(`Error en el servicio (getAllProducts): ${error.message}`);
    }
  };

  getProductById = async (id) => {
    try {
      return await this.productRepository.getProductById(id);
    } catch (error) {
      throw new Error(`Error en el servicio (getProductById): ${error.message}`);
    }
  };

  modifyProductById = async (id, updateData) => {
    try {
      const updatedProduct = await this.productRepository.modifyProductById(id, updateData);
      if (!updatedProduct) {
        throw new Error("Producto no encontrado en la base de datos");
      }
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error en el servicio (modifyProductById): ${error.message}`);
    }
  };

  deleteProductById = async (id) => {
    try {
      return await this.productRepository.deleteProductById(id);
    } catch (error) {
      throw new Error(`Error en el servicio (deleteProductById): ${error.message}`);
    }
  };
}

export { ProductService };
