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

// Esto es para lleve al mismo archivo que esta en public
// app.get('*', (req, res) => {
//     res.sendFile( __dirname + '/public/index.html');
// })

// app.get('*', function(req,res) {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));

// });
// app.get('*', (req, res) => {
//     res.redirect('https://www.google.com/');
// })



// Escuchar peticiones
app.listen(process.env.PORT , ()=>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})