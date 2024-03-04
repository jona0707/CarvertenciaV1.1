const Carvertencia = require("../models/Carvertencia.model");
const Auto = Carvertencia.Auto;
const qr = require('qr-image');
const fs = require('fs');


//Crear el auto 
module.exports.createAuto = (request, response) => {
    const { placaAuto, modeloAuto, anioAuto, colorAuto, propAuto } = request.body;
    Auto.create({ placaAuto, modeloAuto, anioAuto, colorAuto, propAuto })
        .then(auto => {
            //Obtener el ID generado automáticamente
            const autoId = auto._id;

            //Generar el código QR basado en la placa y el ID del auto
            const qrData = `ID: ${autoId}\nPlaca: ${placaAuto}`;
            const qr_png = qr.imageSync(qrData, { type: 'png' });
            const qrBuffer = qr_png.toString('base64');
            fs.writeFileSync('qr_image2.png', qr_png); // Guardar la imagen QR en un archivo llamado 'qr_image.png'

            //Actualizar el auto con el código QR generado
            return Auto.findByIdAndUpdate(autoId, { qrAutomovil: qrBuffer }, { new: true });
        })
        .then(updatedAuto => {
            // Responder con el auto creado y actualizado
            response.json(updatedAuto);
        })
        .catch(error => {
            console.error('Error al crear el auto:', error);
            response.status(400).json({ message: 'El auto no se pudo crear.' });
        });
}



//Editar auto
module.exports.updateAuto = (request, response) => {
    const { id } = request.params;
    const { modeloAuto, anioAuto, colorAuto, propAuto } = request.body;

    //Buscar el auto por ID
    Auto.findById(id)
        .then(auto => {
            //Si no se encontró el auto, devolver un mensaje de error
            if (!auto) {
                return response.status(404).json({ message: 'Auto no encontrado.' });
            }

            //Actualizar los campos del auto con los nuevos valores, excluyendo la placa
            auto.modeloAuto = modeloAuto;
            auto.anioAuto = anioAuto;
            auto.colorAuto = colorAuto;
            //Este prop Auto es el id de algún propietario.
            auto.propAuto = propAuto;

            //Guardar los cambios en la base de datos
            return auto.save();
        })
        .then(auto => {
            //Responder con el auto actualizado
            response.json(auto);
        })
        .catch(error => {
            console.error('Error al actualizar el auto:', error);
            response.status(400).json({ message: 'Error al actualizar el auto.' });
        });
};


//Eliminar un auto
module.exports.deleteAuto = (request, response) => {
    const { id } = request.params;

    Auto.findByIdAndDelete(id)
        .then(auto => {
            if (!auto) {
                return response.status(404).json({ message: 'Auto no encontrado.' });
            }
            response.json({ message: 'Auto eliminado exitosamente.' });
        })
        .catch(error => {
            console.error('Error al eliminar el auto:', error);
            response.status(400).json({ message: 'Error al eliminar el auto.' });
        });
};

// Recuperar todos los autos
module.exports.getAllAutos = (request, response) => {
    Auto.find()
        .then(autos => {
            // Convertir el QR de Buffer a base64 para cada auto
            const autosWithBase64QR = autos.map(auto => {
                const qrBase64 = auto.qrAutomovil.toString('base64');
                return {
                    ...auto.toJSON(),
                    qrAutomovil: qrBase64
                };
            });
            response.json(autosWithBase64QR);
        })
        .catch(error => {
            console.error('Error al obtener los autos:', error);
            response.status(400).json({ message: 'Error al obtener los autos.' });
        });
};

// Recuperar un auto
module.exports.getAuto = (request, response) => {
    const { id } = request.params;

    Auto.findById(id)
        .then(auto => {
            if (!auto) {
                return response.status(404).json({ message: 'Auto no encontrado.' });
            }
            // Convertir el QR de Buffer a base64
            const qrBase64 = auto.qrAutomovil.toString('base64');
            // Devolver el auto con el QR convertido a base64
            const autoWithBase64QR = {
                ...auto.toJSON(),
                qrAutomovil: qrBase64
            };
            response.json(autoWithBase64QR);
        })
        .catch(error => {
            console.error('Error al obtener el auto:', error);
            response.status(400).json({ message: 'Error al obtener el auto.' });
        });
};
