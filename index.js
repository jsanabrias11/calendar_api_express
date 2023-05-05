const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');


// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio público
app.use( express.static('public'));

// Parcear Json
app.use( express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


app.get('*', (req, res) => {
    res.sendFile( __dirname + 'dist/index.html');
})


// Escuchar peticiones
app.listen(process.env.PORT , ()=>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})