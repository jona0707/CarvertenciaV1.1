const express = require('express');
require('./server/config/mongoose.config');
const cors = require('cors');
const app = express();
const port = 8000;

//Midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const allCarvertenciaRoutes = require('./server/routes/Carvertencia.routes');
allCarvertenciaRoutes(app);

//Server Listen
app.listen(port, () => {
    console.log("Servidor activo y escuchando en el puerto: ", port);
})
