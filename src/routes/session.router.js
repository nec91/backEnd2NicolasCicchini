import { Router } from 'express';
import { passportAuthenticate } from '../middlewares/passportAuth.middleware.js';
import usersController from '../controller/users.controller.js';

const sessionRouter = Router();

sessionRouter.post(
  "/register",
  passportAuthenticate('register', { failureRedirect: '/api/sessions/fail-register' }),
  usersController.registerUser
);

sessionRouter.get("/fail-register", (req, res) => {
  res.status(401).send({ error: "Failed to process register!" });
});

sessionRouter.post("/login", usersController.loginUser);

sessionRouter.get("/logout", usersController.logoutUser);

export { sessionRouter };