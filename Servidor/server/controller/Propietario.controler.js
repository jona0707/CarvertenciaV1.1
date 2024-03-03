const Carvertencia = require( "../models/Carvertencia.model" );
//Para no escribir tanto:
const Propietario = Carvertencia.Propietario;


//Crear propietario
module.exports.createPropietario = (request, response) => {
    const { nombreProp, cedulaProp, dirProp, avatarProp } = request.body;
    
    //Convertir los datos base64 a un búfer si están presentes
    let avatarBuffer;
    if (avatarProp) {
        avatarBuffer = Buffer.from(avatarProp, 'base64');
    }

    //Crear el propietario con los datos y la imagen (si está presente)
    Propietario.create({
        nombreProp, cedulaProp, dirProp, avatarProp: avatarBuffer 
    })
    .then(propietario => {
        //Responder con el propietario creado
        response.json(propietario);
    })
    .catch(error => {
        console.error('Error al crear el propietario:', error);
        response.status(400).json({ message: 'El propietario no se pudo crear.' });
    });
}

//Editar propietario
module.exports.updatePropietario = (request, response) => {
    const { id } = request.params; 
    const { nombreProp, cedulaProp, dirProp, avatarProp } = request.body;

    //Convertir los datos base64 a un búfer si están presentes
    let avatarBuffer;
    if (avatarProp) {
        avatarBuffer = Buffer.from(avatarProp, 'base64');
    }

    // Buscar el propietario por ID
    Propietario.findById(id)
    .then(propietario => {
        //Si no se encontró el propietario, devolver un mensaje de error
        if (!propietario) {
            return response.status(404).json({ message: 'Propietario no encontrado.' });
        }
        //Actualizar los campos del propietario con los nuevos valores (incluida la imagen si se envió)
        propietario.nombreProp = nombreProp;
        propietario.cedulaProp = cedulaProp;
        propietario.dirProp = dirProp;
        propietario.avatarProp = avatarBuffer; 
        //Guardar los cambios en la base de datos
        return propietario.save();
    })
    .then(propietario => {
        //Responder con el propietario actualizado
        response.json(propietario);
    })
    .catch(error => {
        console.error('Error al actualizar el propietario:', error);
        response.status(400).json({ message: 'Error al actualizar el propietario.' });
    });
};

//Eliminar un propietario
module.exports.deletePropietario = (request, response) => {
    const { id } = request.params;

    Propietario.findByIdAndDelete(id)
        .then(propietario => {
            if (!propietario) {
                return response.status(404).json({ message: 'Propietario no encontrado.' });
            }
            response.json({ message: 'Propietario eliminado exitosamente.' });
        })
        .catch(error => {
            console.error('Error al eliminar el propietario:', error);
            response.status(400).json({ message: 'Error al eliminar el propietario.' });
        });
};

//Recuperar todos los propietarios
module.exports.getAllPropietarios = (request, response) => {
    Propietario.find()
        .then(propietarios => {
            //Convertir la imagen de Buffer a base64 para cada propietario
            const propietariosWithBase64Avatar = propietarios.map(propietario => {
                const avatarBase64 = propietario.avatarProp.toString('base64');
                return {
                    ...propietario.toJSON(),
                    avatarProp: avatarBase64
                };
            });
            response.json(propietariosWithBase64Avatar);
        })
        .catch(error => {
            console.error('Error al obtener los propietarios:', error);
            response.status(400).json({ message: 'Error al obtener los propietarios.' });
        });
};

//Recuperar un propietario 
module.exports.getPropietario = (request, response) => {
    const { id } = request.params;

    Propietario.findById(id)
        .then(propietario => {
            if (!propietario) {
                return response.status(404).json({ message: 'Propietario no encontrado.' });
            }
            //Convertir la imagen de Buffer a base64
            const avatarBase64 = propietario.avatarProp.toString('base64');
            //Devolver el propietario con la imagen convertida a base64
            const propietarioWithBase64Avatar = {
                ...propietario.toJSON(),
                avatarProp: avatarBase64
            };
            response.json(propietarioWithBase64Avatar);
        })
        .catch(error => {
            console.error('Error al obtener el propietario:', error);
            response.status(400).json({ message: 'Error al obtener el propietario.' });
        });
};
