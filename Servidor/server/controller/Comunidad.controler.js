const Carvertencia = require("../models/Carvertencia.model");
const Comunidad = Carvertencia.Comunidad;

// Crear comunidad
module.exports.createComunidad = (request, response) => {
    const { nombreComu } = request.body;
    Comunidad.create({
        nombreComu
    })
    .then(comunidad => response.json(comunidad))
    .catch(error => response.status(400).json({ message: 'La comunidad no se pudo crear.' }));
}

//Agregar brigadista
module.exports.addBrigComu = (request, response) => {
    const { idComunidad, idBrigadista } = request.body;

    Comunidad.findById(idComunidad)
        .then(comunidad => {
            if (!comunidad) {
                return response.status(404).json({ message: 'Comunidad no encontrada.' });
            }
            //Agrego el brigadista
            comunidad.brigComu.push(idBrigadista);
            return comunidad.save();
        })
        .then(comunidad => {
            response.json(comunidad);
        })
        .catch(error => response.status(400).json({ message: 'Error al agregar brigadista a la comunidad.' }));
}

//Agregar auto:
module.exports.addAutoComu = (request, response) => {
    const { idComunidad, idAuto } = request.body;

    Comunidad.findById(idComunidad)
        .then(comunidad => {
            if (!comunidad) {
                return response.status(404).json({ message: 'Comunidad no encontrada.' });
            }
            // Agregar el auto
            comunidad.autosComu.push(idAuto);
            return comunidad.save();
        })
        .then(comunidad => {
            response.json(comunidad);
        })
        .catch(error => response.status(400).json({ message: 'Error al agregar auto a la comunidad.' }));
}

//Agregar propietario:
module.exports.addPropietarioComu = (request, response) => {
    const { idComunidad, idPropietario } = request.body;

    Comunidad.findById(idComunidad)
        .then(comunidad => {
            if (!comunidad) {
                return response.status(404).json({ message: 'Comunidad no encontrada.' });
            }
            // Agregar el propietario
            comunidad.propietariosComu.push(idPropietario);
            return comunidad.save();
        })
        .then(comunidad => {
            response.json(comunidad);
        })
        .catch(error => response.status(400).json({ message: 'Error al agregar propietario a la comunidad.' }));
}





// Editar comunidad
module.exports.updateComunidad = (request, response) => {
    const { id } = request.params;
    const { nombreComu} = request.body;
    Comunidad.findOneAndUpdate({ _id: id }, { nombreComu }, { new: true })
        .then(comunidad => {
            if (!comunidad) {
                return response.status(404).json({ message: 'Comunidad no encontrada.' });
            }
            response.json(comunidad);
        })
        .catch(error => response.status(400).json({ message: 'Error al actualizar la comunidad.' }));
}

// Eliminar comunidad
module.exports.deleteComunidad = (request, response) => {
    const { id } = request.params;
    Comunidad.findOneAndDelete({ _id: id })
        .then(comunidad => {
            if (!comunidad) {
                return response.status(404).json({ message: 'Comunidad no encontrada.' });
            }
            response.json({ message: 'Comunidad eliminada exitosamente.' });
        })
        .catch(error => response.status(400).json({ message: 'Error al eliminar la comunidad.' }));
}

// Obtener todas las comunidades
module.exports.getAllComunidades = (request, response) => {
    Comunidad.find()
        .then(comunidades => {
            response.json(comunidades);
        })
        .catch(error => response.status(400).json({ message: 'Error al obtener comunidades.' }));
}

// Recuperar una comunidad
module.exports.getComunidad = (request, response) => {
    const { id } = request.params;
    Comunidad.findById(id)
        .then(comunidad => {
            if (!comunidad) {
                return response.status(404).json({ message: 'Comunidad no encontrada.' });
            }
            response.json(comunidad);
        })
        .catch(error => response.status(400).json({ message: 'Error al obtener la comunidad.' }));
}
