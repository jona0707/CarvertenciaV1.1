const AdminController = require('../controller/Admin.controler');
const BrigadistaController = require('../controller/Brigadista.controler');
const PropietarioController = require('../controller/Propietario.controler');
const AutomovilController = require('../controller/Auto.controler');
const ComunidadController = require('../controller/Comunidad.controler');
const ReporteController = require('../controller/Reporte.controler');
const LoginController = require('../controller/Login.controler' );
const ValidarController = require('../controller/Validar.controler');
//Middlewares (Para login)
const { protectAdmin, protectBrigadista, protect } = require('../middleware/authorizationMdlw');


module.exports = function (app) {
    //*CONTROLADORES PARA FUNCIONAMIENTO
    //login Admin
    app.post('/api/carvertencia/loginadmin', LoginController.loginAdmin);
    app.post('/api/carvertencia/loginbrig', LoginController.loginBrig);

    //Validar QR
    app.post('/api/carvertencia/validarqr', protect, ValidarController.validarQR)

    //Obtener Comunidades a través de nombre
    app.get('/api/carvertencia/:nombreC', protect, ComunidadController.getComunidadNombre)

    //*CONTROLADORES BÁSICOS    
    //ADMINISTRADOR
    //Crear administrador
    app.post('/api/carvertencia/newadmin', AdminController.createAdministrador);
    //Editar administrador
    app.put('/api/carvertencia/updadmin/:id', protectAdmin, AdminController.updateAdministrador);
    //Eliminar administrador
    app.delete('/api/carvertencia/deladmin/:id', protectAdmin, AdminController.deleteAdministrador);
    //Recuperar todos los administradores
    app.get('/api/carvertencia/admins', protectAdmin, AdminController.getAllAdministradores);
    //Recuperar un administrador
    app.get('/api/carvertencia/admin/:id', protectAdmin, AdminController.getAdministrador);

    //BRIGADISTA
    //Crear brigadista
    app.post('/api/carvertencia/newbrig', BrigadistaController.createBrigadista);
    //Editar Brigadista
    app.put('/api/carvertencia/updbrig/:id', protectBrigadista, BrigadistaController.updateBrigadista);
    //Eliminar Brigadista
    app.delete('/api/carvertencia/delbrig/:id', protectBrigadista, BrigadistaController.deleteBrigadista);
    //Recuperar todos los Brigadistaes
    app.get('/api/carvertencia/brigs', protectBrigadista, BrigadistaController.getAllBrigadistas);
    //Recuperar un Brigadista
    app.get('/api/carvertencia/brig/:id', protectBrigadista, BrigadistaController.getBrigadista);

    //PROPIETARIO
    //Crear Propietario
    app.post('/api/carvertencia/newprop', protectAdmin,  PropietarioController.createPropietario);
    //Editar Propietario
    app.put('/api/carvertencia/updprop/:id', protectAdmin,  PropietarioController.updatePropietario);
    //Eliminar Propietario
    app.delete('/api/carvertencia/delprop/:id', protectAdmin,  PropietarioController.deletePropietario);
    //Recuperar todos los Propietarios
    app.get('/api/carvertencia/props', protectAdmin,  PropietarioController.getAllPropietarios);
    //Recuperar un Propietario
    app.get('/api/carvertencia/prop/:id', protectAdmin,  PropietarioController.getPropietario);

    //AUTOMÓVILES
    //Crear Automovil
    app.post('/api/carvertencia/newauto', protectAdmin,  AutomovilController.createAuto);
    //Editar Automovil
    app.put('/api/carvertencia/updauto/:id', protectAdmin,  AutomovilController.updateAuto);
    //Eliminar Automovil
    app.delete('/api/carvertencia/delauto/:id', protectAdmin,  AutomovilController.deleteAuto);
    //Recuperar todos los Automoviles
    app.get('/api/carvertencia/autos', protectAdmin,  AutomovilController.getAllAutos);
    //Recuperar un Automovil
    app.get('/api/carvertencia/auto/:id', protectAdmin,  AutomovilController.getAuto);

    //COMUNIDDADES
    //Crear Automovil
    app.post('/api/carvertencia/newcomu', protectAdmin,  ComunidadController.createComunidad);
    //Editar Automovil
    app.put('/api/carvertencia/updcomu/:id', protectAdmin,  ComunidadController.updateComunidad);
    //Eliminar Automovil
    app.delete('/api/carvertencia/delcomu/:id', protectAdmin,  ComunidadController.deleteComunidad);
    //Recuperar todos los Automoviles
    app.get('/api/carvertencia/comus', protectAdmin,  ComunidadController.getAllComunidades);
    //Recuperar un Automovil
    app.get('/api/carvertencia/comu/:id', protectAdmin,  ComunidadController.getComunidad);

    //Agregar Brigadista
    app.post('/api/carvertencia/addbrigcomu/', protectAdmin,  ComunidadController.addBrigComu);
    //Agregar Propietario
    app.post('/api/carvertencia/addpropcomu/', protectAdmin,  ComunidadController.addPropietarioComu);
    //Agregar Auto
    app.post('/api/carvertencia/addautocomu/', protectAdmin,  ComunidadController.addAutoComu);


    //REPORTE
    //Crear Reporte
    app.post('/api/carvertencia/newreporte', protect, ReporteController.createReporte);
    //Recuperar todos los reportes
    app.get('/api/carvertencia/reportes', protect, ReporteController.getAllReportes);
    //Recuperar un reporte
    app.get('/api/carvertencia/reporte/:id', protect, ReporteController.getReporte);

}