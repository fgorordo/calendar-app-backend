const { response } = require("express");
const jwt = require("jsonwebtoken");

const tokenValidator = (req, res = response, next) => {
    // x-token
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No existe token en la petición",
        });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_SEED);
        (req._id = payload._id), (req.name = payload.name);
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token invalido",
        });
    }

    return next();
};

module.exports = { tokenValidator };
