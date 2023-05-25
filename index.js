const {conexion} = require("./basedatos/conexion");
const express = require('express');
const cors = require("cors")
const morgan = require('morgan');
const routes = require('./routes/index.js');

//Inicializar app
console.log("App de node iniciada");

//Conectar con la base de datos
conexion();

//Crear servidor de node
const app = express();
const PUERTO = 3001;

//Configurar cors
app.use(cors());

//Convertir body a objeto js
app.use(express.json());
app.use(express.urlencoded({extended:true})) // por si me llegar los datos por el formato normal
app.use(morgan('dev'));

//Crear rutas
app.use('/', routes);


//Crear servidor y escuchar peticiones http
app.listen(PUERTO, ()=>{

    console.log("Servidor corriendo en el puerto " + PUERTO)

})