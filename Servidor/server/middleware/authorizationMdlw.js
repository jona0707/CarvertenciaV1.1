require("dotenv").config();
const jwt = require('jsonwebtoken');
const Carvertencia = require( "../models/Carvertencia.model" );
const Admin = Carvertencia.Admin;
const Brigadista = Carvertencia.Brigadista;


//*Midleware para autorizar admin:
module.exports.protectAdmin = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //se obtiene el token (p.ej., Bearer DJDHFHFHHFHFHF#%>%)
            token = req.headers.authorization;
            console.log('Token recibido-con Bearer: ', token);
            token = token.split(' ')[1];
            console.log('Token extraído: ', token);
            //se verifica el token (que no haya sido alterado)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //agregamos a cada petición información del usuario - excepto el password (recuperado con base en el _id //contenido en el payload del token)
            req.Admin = await Admin.findOne({ _id: decoded.id }).select('-passAdmin');
            //Que vaya a la siguiente función. 
            next();
        } catch (error) {
            res.status(401).json({ message: 'No autorizado!' });
        }
    }
    //si no se tienen un token de portador, entonces no estará autorizado
    if (!token) {
        res.status(401).json({ message: 'No autorizado, token inávlido!' });
    }
}
//este middleware es para los usuarios que quieren registrarse o iniciar sesión


//*Midleware para autorizar brigadista:
module.exports.protectBrigadista = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.Brigadista = await Brigadista.findById(decoded.id).select('-passBrig');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized!' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'No autorizado, token inávlido!' });
    }
};


//*Midleware para autorizar a ambos (navegación general):
module.exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token
            token = req.headers.authorization.split(' ')[1];
            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Buscar el usuario en ambos modelos (Admin y Brigadista)
            const admin = await Admin.findById(decoded.id).select('-passAdmin');
            const brigadista = await Brigadista.findById(decoded.id).select('-passBrig');

            // Si el usuario es administrador o brigadista, permitir el acceso
            if (admin || brigadista) {
                req.usuario = admin || brigadista; // Asignar el usuario al objeto de solicitud
                next();
            } else {
                res.status(401).json({ message: 'No autorizado.' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Token inválido.' });
        }
    } else {
        res.status(401).json({ message: 'No autorizado, token inválido.' });
    }
};
