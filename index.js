const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');


// Crear el servidor de express
const app = express();

// Base de datos
dbConnection()

// Directorio público
app.use( express.static('public'));

// Parcear Json
app.use( express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));



// Escuchar peticiones
app.listen(process.env.PORT , ()=>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})