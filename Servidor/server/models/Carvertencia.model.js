const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    userAdmin: {
        type: String,
        //Trim recorta los espacios en blanco "externos".
        trim: true,
        required: [true, "Ingrese su nombre de usuario como administrador!"],
        validate: {
            validator: function (value) {
                //Verifica que el valor no contenga espacos en blanco, la función test verifica si se tiene espacios en blanco.
                return !/\s/.test(value);
            },
            message: "Ingrese un nombre de usuario de administrador válido (Sin espacios en blanco)."
        }
    },
    passAdmin: {
        type: String,
        trim: true,
        required: [true, "Ingrese su contraseña por favor."],
        validate: {
            validator: function (value) {
                // Se permiten caracteres alfauméricos y los especiales mostrados.
                return /^[a-zA-Z0-9!@#$%&*()]*$/.test(value);
            },
            message: "Únicamente se admmiten los siguientes especiales: !@#$%&*()."
        }
    },
    emailAdmin: {
        type: String,
        trim: true,
        required: [true, "Ingrese su correo por favor."],
        //Defino al correo como clave única.
        unique: [true, "El correo ya se encuentra registrado."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "El correo ingresado es inválido, revíselo por favor."
        },
    },
});

const BrigSchema = new mongoose.Schema({
    userBrig: {
        type: String,
        required: [true, "Ingrese su usuario por favor."],
        unique: true,
        trim: true
    },
    passBrig: {
        type: String,
        required: [true, "Ingrese su contraseña por favor."],
        trim: true
    },
    emailBrig: {
        type: String,
        trim: true,
        required: [true, "Ingrese su correo por favor."],
        unique: [true, "El correo ya se encuentra registrado."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "El correo ingresado es inválido, revíselo por favor."
        },
    },
    nameBrig: {
        type: String,
        required: [true, "Ingrese su nombre por favor."],
        trim: true
    },
    cedulaBrig: {
        type: String,
        required: [true, "Ingrese su cedula por favor."],
        trim: true
    },
    dirBrig: {
        type: String,
        required: [true, "Ingrese su dirección por favor."],
        trim: true
    },
    sectorBrig: {
        type: String,
        required: [true, "Ingrese su sector por favor."],
        trim: true
    },
    avatarBrig: {
        type: Buffer,
    },
});

const PropietarioSchema = new mongoose.Schema({
    nombreProp: {
        type: String,
        required: [true, "Ingrese su nombre por favor."],
        trim: true
    },
    cedulaProp: {
        type: String,
        required: [true, "Ingrese su cedula por favor."],
        trim: true
    },
    dirProp: {
        type: String,
        required: [true, "Ingrese su dirección por favor."],
        trim: true
    },
    avatarProp: {
        type: Buffer,
    },
});

const AutoSchema = new mongoose.Schema({
    placaAuto: {
        type: String,
        unique: [true, "La placa ya está registrada."],
        required: [true, "Ingrese la placa del automóvil por favor."],
        trim: true
    },
    modeloAuto: {
        type: String,
        required: [true, "Ingrese el modelo del automóvil por favor."],
        trim: true
    },
    anioAuto: {
        type: String,
        required: [true, "Ingrese el año del automóvil por favor."],
        trim: true
    },
    colorAuto: {
        type: String,
        required: [true, "Ingrese el color del automóvil por favor."],
        trim: true
    },
    propAuto: { type: mongoose.Schema.Types.ObjectId, ref: 'Propietario' },
    qrAutomovil: {
        type: Buffer,
    },
});

const ComunidadSchema = new mongoose.Schema({
    nombreComu: {
        type: String,
        required: [true, "Ingrese el nombre de la comunidad por favor."],
        trim: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    brigComu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brigadista' }]
});

const ReporteSchema = new mongoose.Schema({
    autoRep: { type: mongoose.Schema.Types.ObjectId, ref: 'Auto' },
    placaRep: {
        type: String,
        required: [true, "Ingrese una placa por favor"],
        trim: true,
    },
    descripcionRep: {
        type: String,
        required: [true, "Ingrese una descripción de lo sucedido"],
        trim: true,
    },
    fechaRep: {
        type: Date,
        default: Date.now,
    },
});


//Exportación.
const Brigadista = mongoose.model('Brigadista', BrigSchema);
const Comunidad = mongoose.model('Comunidad', ComunidadSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Propietario = mongoose.model('Propietario', PropietarioSchema);
const Auto = mongoose.model('Auto', AutoSchema);
const Reporte = mongoose.model('Reporte', ReporteSchema);

module.exports = { Admin, Brigadista, Comunidad, Propietario, Auto, Reporte };