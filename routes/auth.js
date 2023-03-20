/*
    User Routes / Auth
    https://localhost/api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { fieldsValidator } = require("../middlewares/fields-validator");
const { registerUser, loginUser, renewToken } = require("../controllers/auth");
const { tokenValidator } = require("../middlewares/token-validator");

const router = Router();

router.post(
    "/new",
    [
        check("name", "Debes ingresar tu nombre").not().isEmpty(),
        check("email", "Debes ingresar un correo electronico").isEmail(),
        check(
            "password",
            "Debes ingresar una contraseña y debe tener como minimo 6 caracteres"
        ).isLength({ min: 6 }),
        fieldsValidator,
    ],
    registerUser
);

router.post(
    "/",
    [
        check("email", "Debes ingresar un correo electronico").isEmail(),
        check(
            "password",
            "Debes ingresar una contraseña y debe tener como minimo 6 caracteres"
        ).isLength({ min: 6 }),
        fieldsValidator,
    ],
    loginUser
);

router.get("/renew", tokenValidator, renewToken);

module.exports = router;
