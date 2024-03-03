const Carvertencia = require( "../models/Carvertencia.model" );
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Función para generar el token (toma como argumento de entrada un id)
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'})
}

//Login de administrador:
module.exports.loginAdmin = async (req, res) => {
    const { emailAdmin, passAdmin } = req.body;

    try {
        const adminFound = await Carvertencia.Admin.findOne({ emailAdmin });
        if (adminFound && (await bcrypt.compare(passAdmin, adminFound.passAdmin))) {
            res.json({ message: 'Administrador logueado', emailAdmin: adminFound.emailAdmin, userAdmin: adminFound.userAdmin, token: generateToken(adminFound._id) });
        } else {
            res.status(400).json({ message: 'Error, correo o contraseña de administrador inválidos.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

//Login de brigadista:
module.exports.loginBrig = async (req, res) => {
    const { emailBrig, passBrig } = req.body;
    // console.log(req.body);
    try {
        const brigadistaFound = await Carvertencia.Brigadista.findOne({ emailBrig });
        if (brigadistaFound && (await bcrypt.compare(passBrig, brigadistaFound.passBrig))) {
            res.json({ message: 'Brigadista logueado', emailBrig: brigadistaFound.emailBrig, userBrig: brigadistaFound.userBrig, token: generateToken(brigadistaFound._id) });
        } else {
            res.status(400).json({ message: 'Error, correo o contraseña de brigadista inválidos.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};