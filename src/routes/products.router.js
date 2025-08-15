import { Router } from "express";
import  ProductController  from '../controller/products.controller.js'
import { paginateProducts } from "../middlewares/pagination.middleware.js";

const productsRouter = Router();


// Ruta para mostrar todos los productos
productsRouter.get("/",
  paginateProducts,
  ProductController.getAllProducts
 );

// Ruta para mostrar producto filtrado por ID
productsRouter.get("/:pid", 
  ProductController.getProductById
);

// Ruta para ingresar un producto
productsRouter.post("/", 
  ProductController.createProduct)

// Ruta para modificar un producto
productsRouter.put("/:pid", 
  ProductController.modifyProductById
);

// Ruta para eliminar un producto por ID
productsRouter.delete("/:pid",
  ProductController.deleteProductById
);

export { productsRouter };
