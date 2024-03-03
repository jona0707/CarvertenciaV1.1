const Carvertencia = require( "../models/Carvertencia.model" );
const Brigadista = Carvertencia.Brigadista;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Función para generar el token (toma como argumento de entrada un id)
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'})
}


//****** Brigadista ******
//Crear brigadista
// module.exports.createBrigadista = (request, response) => {
//     const { userBrig, passBrig, emailBrig, nameBrig, cedulaBrig, dirBrig, sectorBrig, avatarBrig } = request.body;
    
//     // Convertir los datos base64 a un búfer si están presentes
//     let avatarBuffer;
//     if (avatarBrig) {
//         avatarBuffer = Buffer.from(avatarBrig, 'base64');
//     }

//     // Crear el brigadista con los datos y la imagen (si está presente)
//     Carvertencia.Brigadista.create({
//         userBrig,
//         passBrig,
//         emailBrig,
//         nameBrig,
//         cedulaBrig,
//         dirBrig,
//         sectorBrig,
//         avatarBrig: avatarBuffer // Asignar el búfer convertido
//     })
//     .then(brigadista => {
//         // Responder con el brigadista creado
//         response.json(brigadista);
//     })
//     .catch(error => {
//         console.error('Error al crear el brigadista:', error);
//         response.status(400).json({ message: 'El brigadista no se pudo crear.' });
//     });
// }

module.exports.createBrigadista = async (request, response) => {
    const { userBrig, passBrig, emailBrig, nameBrig, cedulaBrig, dirBrig, sectorBrig, avatarBrig } = request.body;

    try {
        // Verificar si ya existe un brigadista con el mismo correo electrónico
        const brigadistaFound = await Brigadista.findOne({ emailBrig });
        if (brigadistaFound) {
            return response.status(400).json({ message: 'El brigadista ya existe.' });
        }

        // Generar el hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passBrig, salt);

        // Convertir los datos base64 a un búfer si están presentes
        let avatarBuffer;
        if (avatarBrig) {
            avatarBuffer = Buffer.from(avatarBrig, 'base64');
        }

        // Crear el brigadista con los datos y la imagen (si está presente)
        const brigadista = await Brigadista.create({
            userBrig, passBrig: hashedPassword, emailBrig, nameBrig, cedulaBrig, dirBrig, sectorBrig, avatarBrig: avatarBuffer});

        // Responder con el brigadista creado y el token
        response.json({ email: brigadista.emailBrig, userBrig: brigadista.userBrig, _id: brigadista._id, token: generateToken(brigadista._id) });
    } catch (error) {
        console.error('Error al crear el brigadista:', error);
        response.status(400).json({ message: 'El brigadista no se pudo crear.' });
    }
};



//Editar brigadista
module.exports.updateBrigadista = (request, response) => {
    const { id } = request.params; 
    const { userBrig, passBrig, emailBrig, nameBrig, cedulaBrig, dirBrig, sectorBrig, avatarBrig } = request.body;

    // Convertir los datos base64 a un búfer si están presentes
    let avatarBuffer;
    if (avatarBrig) {
        avatarBuffer = Buffer.from(avatarBrig, 'base64');
    }

    //Buscar el brigadista por ID
    Carvertencia.Brigadista.findById(id)
    .then(brigadista => {
        //Si no se encontró el brigadista, devolver un mensaje de error
        if (!brigadista) {
            return response.status(404).json({ message: 'Brigadista no encontrado.' });
        }
        
        // Actualizar los campos del brigadista con los nuevos valores (incluida la imagen si se envió)
        brigadista.userBrig = userBrig;
        brigadista.passBrig = passBrig;
        brigadista.emailBrig = emailBrig;
        brigadista.nameBrig = nameBrig;
        brigadista.cedulaBrig = cedulaBrig;
        brigadista.dirBrig = dirBrig;
        brigadista.sectorBrig = sectorBrig;
        brigadista.avatarBrig = avatarBuffer; // Actualizar el campo avatarBrig con el búfer

        //Guardar los cambios en la base de datos
        return brigadista.save();
    })
    .then(brigadista => {
        //Responder con el brigadista actualizado
        response.json(brigadista);
    })
    .catch(error => {
        console.error('Error al actualizar el brigadista:', error);
        response.status(400).json({ message: 'Error al actualizar el brigadista.' });
    });
};

//Eliminar un brigadista
//Con promesas
module.exports.deleteBrigadista = (request, response) => {
    const { id } = request.params;

    Carvertencia.Brigadista.findByIdAndDelete(id)
        .then(brigadista => {
            if (!brigadista) {
                return response.status(404).json({ message: 'Brigadista no encontrado.' });
            }
            response.json({ message: 'Brigadista eliminado exitosamente.' });
        })
        .catch(error => {
            console.error('Error al eliminar el brigadista:', error);
            response.status(400).json({ message: 'Error al eliminar el brigadista.' });
        });
};

//Recuperar todos los brigadistas
module.exports.getAllBrigadistas = (request, response) => {
    Carvertencia.Brigadista.find()
        .then(brigadistas => {
            //Convertir la imagen de Buffer a base64 para cada brigadista
            const brigadistasWithBase64Avatar = brigadistas.map(brigadista => {
                const avatarBase64 = brigadista.avatarBrig.toString('base64');
                return {
                    ...brigadista.toJSON(),
                    avatarBrig: avatarBase64
                };
            });
            response.json(brigadistasWithBase64Avatar);
        })
        .catch(error => {
            console.error('Error al obtener los brigadistas:', error);
            response.status(400).json({ message: 'Error al obtener los brigadistas.' });
        });
};

//Recuperar un brigadista 
module.exports.getBrigadista = (request, response) => {
    const { id } = request.params;

    Carvertencia.Brigadista.findById(id)
        .then(brigadista => {
            if (!brigadista) {
                return response.status(404).json({ message: 'Brigadista no encontrado.' });
            }
            //Convertir la imagen de Buffer a base64
            const avatarBase64 = brigadista.avatarBrig.toString('base64');
            //Devolver el brigadista con la imagen convertida a base64
            const brigadistaWithBase64Avatar = {
                ...brigadista.toJSON(),
                avatarBrig: avatarBase64
            };
            response.json(brigadistaWithBase64Avatar);
        })
        .catch(error => {
            console.error('Error al obtener el brigadista:', error);
            response.status(400).json({ message: 'Error al obtener el brigadista.' });
        });
};
