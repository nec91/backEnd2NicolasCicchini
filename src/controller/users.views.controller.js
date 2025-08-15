import { ProductService } from "../services/products.services.js";
import { TicketService } from "../services/ticket.services.js";
import { CartService } from "../services/carts.services.js";

const cartService = new CartService();
const ticketService = new TicketService();
const productsService = new ProductService();

class UsersViewsController {
  constructor() { }

  renderLogin = async (req, res) => {
    try {
      res.render("login");
    } catch (error) {
      console.error("Error renderizando login:", error.message);
      res.status(500).send({ status: "error", message: "Error al renderizar login" });
    }
  };

  renderRegister = async (req, res) => {
    try {
      res.render("register");
    } catch (error) {
      console.error("Error renderizando register:", error.message);
      res.status(500).send({ status: "error", message: "Error al renderizar register" });
    }
  };

  renderProfile = async (req, res) => {
    try {
      res.render('profile', {
        user: {
          name: `${req.user.first_name} ${req.user.last_name}`,
          email: req.user.email,
          age: req.user.age,
          isAdmin: req.user.role === 'admin',
        }
      });
    } catch (error) {
      console.error("Error renderizando profile:", error.message);
      res.status(500).send({ status: "error", message: "Error al renderizar perfil" });
    }
  };

  renderAdminDashboard = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const { products, pagination } = await productsService.getAllProducts({}, { page, limit });

      res.render("admin", {
        user: req.user,
        products,
        pagination,
      });
    } catch (error) {
      console.error("Error renderizando dashboard admin:", error.message);
      res.status(500).send({ status: "error", message: "Error al renderizar dashboard admin" });
    }
  };

  renderPurchaseProducts = async (req, res) => {
    try {
      const { products } = await productsService.getAllProducts();

      // Agrupa los productos por código
      const productsByCode = {};

      products.forEach(product => {
        const code = product.code;
        if (!productsByCode[code]) {
          productsByCode[code] = {
            ...product,
            quantity: product.stock,
            price: product.price,
          };
        } else {
          // sumamos stock
          productsByCode[code].quantity += product.stock;
          // mantenemos precio más alto
          if (product.price > productsByCode[code].price) {
            productsByCode[code].price = product.price;
          }
        }
      });

      const unifiedProducts = Object.values(productsByCode);

      res.render("Products", {
        user: req.user,
        products: unifiedProducts,
      });
    } catch (error) {
      console.error("Error renderizando productos de compra:", error.message);
      res.status(500).send({ status: "error", message: "Error al mostrar productos para compra." });
    }
  };

  renderTicketById = async (req, res) => {
    try {
        const { tid } = req.params;
        const ticket = await ticketService.getTicketById(tid);
        if (!ticket) {
            return res.status(404).send("Ticket no encontrado.");
        }
        res.render("tickets", { user: req.user, ticket });
    } catch (error) {
        console.error("Error renderizando ticket:", error.message);
        res.status(500).send("Error al mostrar ticket.");
    }
};

  renderCart = async (req, res) => {
    try {
      const cartId = req.user.cart;

      if (!cartId) {
        return res.status(400).send("No tienes un carrito asociado.");
      }

      const cart = await cartService.getCartById(cartId);
      const cartTotal = cart.products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

      res.render("carts", { user: req.user, cart, cartTotal });
    } catch (error) {
      console.error("Error renderizando carrito:", error.message);
      res.status(500).send("Error al renderizar carrito.");
    }
  };
}

export const usersViewsController = new UsersViewsController();
