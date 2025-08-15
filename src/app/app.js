import express from "express";
import handlebars from 'express-handlebars'
import { __dirname, config } from "../config/config.js";
import initializePassport from "../config/passport.config.js";

import cookieParser from "cookie-parser";
import passport from "passport";
import session from 'express-session';

import { cartRouter } from "../routes/carts.router.js";
import { productsRouter } from "../routes/products.router.js";
import { usersViewRouter } from "../routes/users.view.router.js";
import { sessionRouter } from "../routes/session.router.js";
import { mocksRouter } from "../routes/mocks.router.js";

const initApp = () => {
  const app = express();

  //Parse config
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Config HBS
  const hbs = handlebars.create({
    helpers: {
      multiply: (a, b) => a * b,
      lte: (a, b) => a <= b
    }
  });  
  app.engine('handlebars', hbs.engine);
  app.set('views', __dirname + '/src/views');
  app.set('view engine', 'handlebars');
  app.use(express.static(__dirname + '/src/public'));


  //Cookies
  app.use(cookieParser(config.cookiePassword))
  app.use(session(config.session));

  //Config Passport
  initializePassport()
  app.use(passport.initialize())
  app.use(passport.session())

  //Routes
  app.use("/api/carts", cartRouter);
  app.use("/api/products", productsRouter);
  app.use("/users", usersViewRouter);
  app.use("/api/sessions", sessionRouter);
  app.use("/api/mocks", mocksRouter);

  app.all("*", (req, res) => {
    res.status(404).send({
      Error: "Path no encontrado",
    });
  });

  return app;
};

export default initApp;
