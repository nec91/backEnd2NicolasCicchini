import { Router } from "express";
import { passportAuthenticate } from "../middlewares/passportAuth.middleware.js";
import cartsController from "../controller/carts.controller.js";

const cartRouter = Router();



// Crear un nuevo carrito
cartRouter.post("/", passportAuthenticate("current"), cartsController.createCart);

// Obtener productos de un carrito
cartRouter.get("/:cid", cartsController.getCartById);

// Agregar un producto al carrito
cartRouter.post("/:cid/products/:pid", cartsController.addProductToCart);

// Eliminar un producto de un carrito
cartRouter.delete("/:cid/products/:pid", cartsController.removeProductFromCart);

// Eliminar un carrito por su ID
cartRouter.delete("/:cid", cartsController.deleteCartById);

// Reemplazar todos los productos del carrito
cartRouter.put("/:cid", cartsController.updateCartProducts);

// Actualiza solo la cantidad de un producto en el carrito
cartRouter.put("/:cid/products/:pid", cartsController.updateProductQuantity);

//Finalizacion de proceso de compra
cartRouter.post("/:cid/purchase", passportAuthenticate('current'), cartsController.purchaseCart);

export { cartRouter }