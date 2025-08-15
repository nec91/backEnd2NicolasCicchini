import passport from "passport";

export const passportAuthenticate = (strategy, options = {}) => {
    return (req, res, next) => {
        passport.authenticate(strategy, options, (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({ status: "error", message: info?.message || "No autorizado" });
            }
            req.user = user;
            next();
        })(req, res, next);
    };
};
