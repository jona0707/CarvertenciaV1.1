const Carvertencia = require( "../models/Carvertencia.model" );
const Comunidad = Carvertencia.Comunidad;
module.exports.validarQR = async (request, response) => {
    const { id, placa } = request.body;

    try {
        //Buscar en todas las comunidades si el auto está asociado a alguna
        const comunidades = await Comunidad.find({ autosComu: id });

        if (comunidades.length > 0) {
            //El auto está asociado a alguna comunidad por lo que tomo la primera
            const comunidad = comunidades[0];
            response.json({ resultado: true, comunidad: `Este auto pertenece a la comunidad: ${comunidad.nombreComu}` });
        } else {
            //Si el auto no está asociado a ninguna comunidad, buscar en otras comunidades
            const otrasComunidades = await Comunidad.find({ autosComu: { $ne: id } });
            if (otrasComunidades.length > 0) {
                //El auto está asociado a otra comunidad
                const otraComunidad = otrasComunidades[0]; // Tomamos la primera comunidad encontrada
                response.json({ resultado: true, comunidad: `Este auto pertenece a otra comunidad: ${otraComunidad.nombreComu}` });
            } else {
                //El auto no está asociado a ninguna comunidad
                response.json({ resultado: false });
            }
        }
    } catch (error) {
        response.status(500).json({ resultado: false, message: "Error al validar el QR." });
    }
};
