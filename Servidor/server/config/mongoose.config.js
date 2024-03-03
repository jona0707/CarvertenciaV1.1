const mongoose = require('mongoose');

const db_name = 'Carvertencia'

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1/" + db_name, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conexión establecida con la base de datos.'))
.catch(err => console.log("Algo salió mal con la base de datos.", err));
