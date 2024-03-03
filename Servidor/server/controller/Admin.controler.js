const Carvertencia = require( "../models/Carvertencia.model" );


//****** Administrador ******
//Crear administrador
module.exports.createAdministrador = (request, response) => {
    const { userAdmin, passAdmin, emailAdmin } = request.body;
    Carvertencia.Admin.create({
        userAdmin, passAdmin, emailAdmin
    })
    .then(user => response.json(user))
    .catch(err => response.status(400).json({ message: 'El administrador no se pudo crear.' }));
}
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

