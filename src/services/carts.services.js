import { CartRepository } from "../repositories/DAO_MONGO/carts.repository.dao.js";

class CartService {
  constructor() {
    this.CartRepository = new CartRepository();
  }

  createCart = async () => {
    return await this.CartRepository.createCart();
  }
  getCartById = async (cartId) => {
    const cart = await this.CartRepository.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");
    return cart;
  }
  addProductToCart = async (cartId, productId, quantity = 1) => {
    const updatedCart = await this.CartRepository.addProductToCart(cartId, productId, quantity);
    if (!updatedCart) throw new Error("Carrito no encontrado");
    return updatedCart;
  }

  removeProductFromCart = async (cartId, productId) => {
    const updatedCart = await this.CartRepository.removeProductFromCart(cartId, productId);
    if (!updatedCart) throw new Error("Carrito o producto no encontrado");
    return updatedCart;
  }
  deleteCartById = async (id) => {
    try {
      return await this.CartRepository.deleteCartById(id)
    } catch (error) {
      throw new Error(`Error en el servicio (deleteCartById): ${error.message}`);
    }
  }

  updateCartProducts = async (cartId, products) => {
    try {
      return await this.CartRepository.updateCartProducts(cartId, products);
    } catch (error) {
      throw new Error(`Error en el servicio (updateCartProducts): ${error.message}`);
    }
  };

  updateProductQuantity = async (cartId, productId, quantity) => {
    try {
      return await this.CartRepository.updateProductQuantity(cartId, productId, quantity);
    } catch (error) {
      throw new Error(`Error en el servicio (updateProductQuantity): ${error.message}`);
    }
  };

}


export { CartService }