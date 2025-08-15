import { Router } from "express";
import { passportAuthenticate } from "../middlewares/passportAuth.middleware.js";
import { authorize } from "../middlewares/authorization.middleware.js";
import { usersViewsController } from "../controller/users.views.controller.js";

const usersViewRouter = Router();

// Vista login
usersViewRouter.get("/login", usersViewsController.renderLogin);

// Vista register
usersViewRouter.get("/register", usersViewsController.renderRegister);

// Perfil del usuario (requiere autenticación)
usersViewRouter.get("/", passportAuthenticate("current"), usersViewsController.renderProfile);

// Dashboard del admin (requiere autenticación + rol admin)
usersViewRouter.get("/dashboard-admin", passportAuthenticate("current"), authorize("admin"), usersViewsController.renderAdminDashboard);

//Vista para seleccionar productos por parte del usuario
usersViewRouter.get("/purchase/products", passportAuthenticate("current"), usersViewsController.renderPurchaseProducts);

//Vista para ver el carrito del usuario
usersViewRouter.get("/purchase/cart", passportAuthenticate("current"), usersViewsController.renderCart);
 
//vista final donde se muestra el ticket de la compra finalizada
usersViewRouter.get("/purchase/ticket/:tid", passportAuthenticate("current"), usersViewsController.renderTicketById);

export { usersViewRouter };