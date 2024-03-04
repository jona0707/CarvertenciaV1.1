const Carvertencia = require( "../models/Carvertencia.model" );
const Comunidad = Carvertencia.Comunidad;


module.exports.validarQR = async (request, response) => {
    const { id, placa } = request.body;

    try {
        // Buscar si el auto está asociado a alguna comunidad
        const comunidad = await Comunidad.findOne({ autosComu: id });
        const auto = await Carvertencia.Auto.findOne({ _id: id });

        if (comunidad) {
            // Si se encuentra una comunidad donde está el auto, devolver un mensaje positivo
            response.json({ resultado: true, modelo: auto.modeloAuto,comunidad: `Este auto pertenece a la comunidad: ${comunidad.nombreComu}` });
        } else {
            // Si no se encuentra ninguna comunidad donde está el auto, devolver un mensaje negativo
            response.json({ resultado: false, message: 'El auto no está asociado a ninguna comunidad.' });
        }
    } catch (error) {
        // Si ocurre un error durante la búsqueda, devolver un mensaje de error
        console.error("Error al validar el QR:", error);
        response.status(500).json({ resultado: false, message: "Error al validar el QR." });
    }
};


