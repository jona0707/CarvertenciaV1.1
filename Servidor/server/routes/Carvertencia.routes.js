const AdminController = require('../controller/Admin.controler');
const BrigadistaController = require('../controller/Brigadista.controler');
const PropietarioController = require('../controller/Propietario.controler');
const AutomovilController = require('../controller/Auto.controler');
const ComunidadController = require('../controller/Comunidad.controler');
const ReporteController = require('../controller/Reporte.controler');


module.exports = function (app) {
    //ADMINISTRADOR
    //Crear administrador
    app.post('/api/carvertencia/newadmin', AdminController.createAdministrador);
    //Editar administrador
    app.put('/api/carvertencia/updadmin/:id', AdminController.updateAdministrador);
    //Eliminar administrador
    app.delete('/api/carvertencia/deladmin/:id', AdminController.deleteAdministrador);
    //Recuperar todos los administradores
    app.get('/api/carvertencia/admins', AdminController.getAllAdministradores);
    //Recuperar un administrador
    app.get('/api/carvertencia/admin/:id', AdminController.getAdministrador);

    //BRIGADISTA
    //Crear brigadista
    app.post('/api/carvertencia/newbrig', BrigadistaController.createBrigadista);
    //Editar Brigadista
    app.put('/api/carvertencia/updbrig/:id', BrigadistaController.updateBrigadista);
    //Eliminar Brigadista
    app.delete('/api/carvertencia/delbrig/:id', BrigadistaController.deleteBrigadista);
    //Recuperar todos los Brigadistaes
    app.get('/api/carvertencia/brigs', BrigadistaController.getAllBrigadistas);
    //Recuperar un Brigadista
    app.get('/api/carvertencia/brig/:id', BrigadistaController.getBrigadista);

    //PROPIETARIO
    //Crear Propietario
    app.post('/api/carvertencia/newprop', PropietarioController.createPropietario);
    //Editar Propietario
    app.put('/api/carvertencia/updprop/:id', PropietarioController.updatePropietario);
    //Eliminar Propietario
    app.delete('/api/carvertencia/delprop/:id', PropietarioController.deletePropietario);
    //Recuperar todos los Propietarios
    app.get('/api/carvertencia/props', PropietarioController.getAllPropietarios);
    //Recuperar un Propietario
    app.get('/api/carvertencia/prop/:id', PropietarioController.getPropietario);

    //AUTOMÓVILES
    //Crear Automovil
    app.post('/api/carvertencia/newauto', AutomovilController.createAuto);
    //Editar Automovil
    app.put('/api/carvertencia/updauto/:id', AutomovilController.updateAuto);
    //Eliminar Automovil
    app.delete('/api/carvertencia/delauto/:id', AutomovilController.deleteAuto);
    //Recuperar todos los Automoviles
    app.get('/api/carvertencia/autos', AutomovilController.getAllAutos);
    //Recuperar un Automovil
    app.get('/api/carvertencia/auto/:id', AutomovilController.getAuto);

    //COMUNIDDADES
    //Crear Automovil
    app.post('/api/carvertencia/newcomu', ComunidadController.createComunidad);
    //Agregar Brigadista
    app.post('/api/carvertencia/addbrigcomu/', ComunidadController.addBrigComu);
    //Editar Automovil
    app.put('/api/carvertencia/updcomu/:id', ComunidadController.updateComunidad);
    //Eliminar Automovil
    app.delete('/api/carvertencia/delcomu/:id', ComunidadController.deleteComunidad);
    //Recuperar todos los Automoviles
    app.get('/api/carvertencia/comus', ComunidadController.getAllComunidades);
    //Recuperar un Automovil
    app.get('/api/carvertencia/comu/:id', ComunidadController.getComunidad);

    //REPORTE
    //Crear Reporte
    app.post('/api/carvertencia/newreporte', ReporteController.createReporte);
    //Recuperar todos los reportes
    app.get('/api/carvertencia/reportes', ReporteController.getAllReportes);
    //Recuperar un reporte
    app.get('/api/carvertencia/reporte/:id', ReporteController.getReporte);

}