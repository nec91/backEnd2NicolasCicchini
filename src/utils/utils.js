import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from "dotenv";

dotenv.config();

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
  console.log(`Datos a validar: user-password: ${user.password}`);
  return bcrypt.compareSync(password, user.password);
}


export const PRIVATE_KEY = process.env.PRIVATE_KEY_JWT
export const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    console.log("Entrando a llamar strategy: ");
    console.log(strategy);

    passport.authenticate(strategy, function (err, user) {
      if (err) return next(err);

      if (!user) {
        console.log("Token inválido o expirado, redirigiendo al login...");
        return res.redirect("/users/login");
      }
      console.log("Usuario obtenido del strategy: ");
      console.log(user);
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const cookieExtractor = req => {
  let token = null;
  console.log("CookieExtractor ejecutado.");
  if (req && req.signedCookies && req.signedCookies.jwtCookieToken) {
      token = req.signedCookies.jwtCookieToken;
      console.log("Token obtenido de req.signedCookies:", token);
  } else if (req && req.cookies && req.cookies.jwtCookieToken) {
      token = req.cookies.jwtCookieToken;
      console.log("Token obtenido de req.cookies:", token);
  } else {
      console.log("No se encontró token en cookies.");
  }
  return token;
};

// Maneja el rol del user
export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT");


    if (req.user.role !== role) {
      return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol, comuniquese con el administrador");
    }
    next();
  }
}
