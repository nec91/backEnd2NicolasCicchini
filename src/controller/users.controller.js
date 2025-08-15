import { UsersService } from "../services/users.services.js";

class UsersController {
    #UsersService
    constructor() {
        this.#UsersService = new UsersService()
    }
    registerUser = async (req, res) => {
        try {
            const user = await this.#UsersService.registerUser(req.body);
            res.status(201).send({ status: "success", message: "Usuario creado con éxito" });
        } catch (error) {
            console.error(error.message);
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            const access_token = await this.#UsersService.loginUser(email, password);

            res.cookie("jwtCookieToken", access_token, {
                maxAge: 60000 * 5,
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                signed: true 
            });
            res.send({ message: "Usuario logueado correctamente" });
        } catch (error) {
            console.error(error.message);
            res.status(401).send({ status: "error", message: error.message });
        }
    };

    logoutUser = async (req, res) => {
        try {
            res.clearCookie("jwtCookieToken");
            res.redirect("/users/login");
        } catch (error) {
            console.error(error.message);
            res.status(500).send({ status: "error", message: "Error al cerrar sesión" });
        }
    };

}

export default new UsersController
