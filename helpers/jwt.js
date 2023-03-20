const jwt = require("jsonwebtoken");

const generateToken = (_id, name) => {
    return new Promise((resolve, reject) => {
        const payload = { _id, name };
        jwt.sign(
            payload,
            process.env.JWT_SECRET_SEED,
            {
                expiresIn: "2h",
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                }

                resolve(token);
            }
        );
    });
};

module.exports = { generateToken };
