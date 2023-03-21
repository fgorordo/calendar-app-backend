const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../helpers/jwt");

const registerUser = async (req, res = response) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "Este correo electronico ya se encuentra registrado.",
            });
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateToken(user._id, user.name);

        return res.status(201).json({
            ok: true,
            _id: user._id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "Las credenciales ingresadas son incorrectas.",
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Las credenciales ingresadas son incorrectas",
            });
        }

        const token = await generateToken(user._id, user.name);

        return res.json({
            ok: true,
            _id: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

const renewToken = async (req, res = response) => {
    const { _id, name } = req;

    try {
        const token = await generateToken(_id, name);

        return res.json({
            ok: true,
            name,
            uid: _id,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Por favor hable con el administrador."
        })
    }
};

module.exports = { registerUser, loginUser, renewToken };
