const Carvertencia = require("../models/Carvertencia.model");
const Reporte = Carvertencia.Reporte;

//Crear un nuevo reporte
module.exports.createReporte = (request, response) => {
    const { placaRep, descripcionRep } = request.body;

    //Verificar si se proporcionaron los datos obligatorios
    if (!placaRep || !descripcionRep) {
        return response.status(400).json({ message: 'Se requiere la placa y la descripción para crear un reporte.' });
    }

    //Crear el nuevo reporte
    Reporte.create({
        placaRep,
        descripcionRep
    })
    .then(reporte => response.json(reporte))
    .catch(error => response.status(400).json({ message: 'No se pudo crear el reporte.' }));
}

//Obtener todos los reportes
module.exports.getAllReportes = (request, response) => {
    Reporte.find()
        .then(reportes => {
            response.json(reportes);
        })
        .catch(error => response.status(400).json({ message: 'Error al obtener los reportes.' }));
}

//Obtener un reporte específico
module.exports.getReporte = (request, response) => {
    const { id } = request.params;
    Reporte.findById(id)
        .then(reporte => {
            if (!reporte) {
                return response.status(404).json({ message: 'Reporte no encontrado.' });
            }
            response.json(reporte);
        })
        .catch(error => response.status(400).json({ message: 'Error al obtener el reporte.' }));
}
