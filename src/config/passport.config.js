import passport from 'passport';
import passportLocal from 'passport-local';
import jwtStrategy from 'passport-jwt';

import { userModel } from '../repositories/models/users.model.js'
import { createHash, PRIVATE_KEY, cookieExtractor } from '../utils/utils.js';


//Declaramos nuestra estrategia:
const localStrategy = passportLocal.Strategy;
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
    //JWT
    passport.use('current', new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        console.log("JWT payload recibido en estrategia:", jwt_payload);
        try {
            const userFromDb = await userModel.findOne({ email: jwt_payload.user.email }).populate('cart');
            if (!userFromDb) {
                return done(null, false);
            }
            return done(null, userFromDb);
        } catch (error) {
            return done(error);
        }
    }));


    //LOCAL
    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {

            console.log("userModel", username);

            const { first_name, last_name, email, age } = req.body;
            try {
                const exists = await userModel.findOne({ email: username });
                if (exists) {
                    console.log("El usuario ya existe.");
                    return done(null, false);
                }
                const user = {
                    first_name,
                    last_name,
                    age,
                    email,
                    password: createHash(password)
                };
                const result = await userModel.create(user);
                return done(null, result);
            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }
    ));
    // Serializacion y Desserializacion 
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
}


export default initializePassport;


