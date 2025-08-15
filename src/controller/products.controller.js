import { ProductService } from "../services/products.services.js";

class ProductController {
  #productService;

  constructor() {
    this.#productService = new ProductService();
  }

  createProduct = async (req, res) => {
    try {
      const { title, description, code, price, stock, category, thumbnail } = req.body;
      const productCreated = await this.#productService.createProduct({
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnail,
      });
      res.send({
        message: "Product created",
        product_id: productCreated._id,
      });
    } catch (error) {
      res.status(400).json({ error: "Error al ingresar el producto." });
    }
  };

  getAllProducts = async (req, res) => {
    try {
      const { query, options } = res.paginatedResults;
      const result = await this.#productService.getAllProducts(query, options);

      res.status(200).json({
        status: "success",
        payload: result.products,
        totalPages: result.pagination.totalPages,
        prevPage: result.pagination.prevPage,
        nextPage: result.pagination.nextPage,
        page: result.pagination.page,
        hasPrevPage: result.pagination.hasPrevPage,
        hasNextPage: result.pagination.hasNextPage,
        prevLink: result.pagination.hasPrevPage ? `/api/products?page=${result.pagination.prevPage}&limit=${options.limit}` : null,
        nextLink: result.pagination.hasNextPage ? `/api/products?page=${result.pagination.nextPage}&limit=${options.limit}` : null
      });
    } catch (error) {
      res.status(400).json({ error: "Error al obtener los productos." });
    }
  };

  getProductById = async (req, res) => {
    try {
      const id = req.params.pid;
      const product = await this.#productService.getProductById(id);
      if (!product) {
        res.status(404).json({ error: "Producto no encontrado" });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      res.status(400).json({ error: "Error al buscar el producto." });
    }
  };

  modifyProductById = async (req, res) => {
    try {
      const id = req.params.pid;
      const updateData = req.body;

      const updatedProduct = await this.#productService.modifyProductById(id, updateData);
      res.status(200).json({
        message: "Producto actualizado exitosamente",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteProductById = async (req, res) => {
    try {
      const id = req.params.pid;
      const deletedProduct = await this.#productService.deleteProductById(id);
      if (!deletedProduct) {
        res.status(404).json({ error: "Producto no encontrado" });
      } else {
        res.status(200).json({
          message: "Producto eliminado correctamente",
          product: deletedProduct,
        });
      }
    } catch (error) {
      res.status(400).json({ error: "Error al buscar el producto." });
    }
  };
}

export default new ProductController();