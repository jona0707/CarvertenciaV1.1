const Carvertencia = require( "../models/Carvertencia.model" );
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Función para generar el token (toma como argumento de entrada un id)
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'})
}

    
//****** Administrador ******
//Crear administrador
// --------------COMENTADO PORQUE SE IMPLEMENTÓ AUTENTICACIÓN:--------------
// module.exports.createAdministrador = (request, response) => {
//     const { userAdmin, passAdmin, emailAdmin } = request.body;
//     Carvertencia.Admin.create({
//         userAdmin, passAdmin, emailAdmin
//     })
//     .then(user => response.json(user))
//     .catch(err => response.status(400).json({ message: 'El administrador no se pudo crear.' }));
// }
//--------------------------------------------------------------------------
module.exports.createAdministrador = async (request, response) => {
    const { userAdmin, passAdmin, emailAdmin } = request.body;
    
    if (!userAdmin || !passAdmin || !emailAdmin) {
        response.status(400).json({ message: 'Por favor, rellena todos los campos.' });
    } else {
        try {
            const adminFound = await Carvertencia.Admin.findOne({ emailAdmin });
            if (adminFound) {
                response.status(400).json({ message: 'El administrador ya existe.' });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(passAdmin, salt);
                Carvertencia.Admin.create({
                    userAdmin, passAdmin: hashedPassword, emailAdmin
                })
                    .then(admin => response.json({ email: admin.emailAdmin, userAdmin: admin.userAdmin, _id: admin._id, token: generateToken(admin._id) }))
                    .catch(err => response.status(400).json({ message: 'Ha ocurrido un error al intentar crear el administrador.' }));
            }
        } catch (error) {
            response.status(500).json({ message: 'Error interno del servidor. Inténtalo más tarde.' });
        }
    }
};
//Editar administrador
module.exports.updateAdministrador = (request, response) => {
    const { id } = request.params;
    const { userAdmin, passAdmin, emailAdmin } = request.body;
    Carvertencia.Admin.findOneAndUpdate({ _id: id }, { userAdmin, passAdmin, emailAdmin }, { new: true })
        .then(admin => {
            if (!admin) {
                return response.status(404).json({ message: 'Administrador no encontrado.' });
            }
            response.json(admin);
        })
        .catch(err => response.status(400).json({ message: 'Error al actualizar el administrador.' }));
}
//Eliminar administrador.
module.exports.deleteAdministrador = (request, response) => {
    const { id } = request.params;
    Carvertencia.Admin.findOneAndDelete({ _id: id })
        .then(admin => {
            if (!admin) {
                return response.status(404).json({ message: 'Administrador no encontrado.' });
            }
            response.json({ message: 'Administrador eliminado exitosamente.' });
        })
        .catch(err => response.status(400).json({ message: 'Error al eliminar el administrador.' }));
}
//Obtener todos los administradores
module.exports.getAllAdministradores = (request, response) => {
    Carvertencia.Admin.find()
        .then(administradores => {
            response.json(administradores);
        })
        .catch(err => response.status(400).json({ message: 'Error al obtener administradores.' }));
}
//Recuperar un administrador
module.exports.getAdministrador = (request, response) => {
    const { id } = request.params;
    Carvertencia.Admin.findById(id)
        .then(admin => {
            if (!admin) {
                return response.status(404).json({ message: 'Administrador no encontrado.' });
            }
            response.json(admin);
        })
        .catch(err => response.status(400).json({ message: 'Error al obtener el administrador.' }));
}

