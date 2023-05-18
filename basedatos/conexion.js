require('dotenv').config();
const mongoose = require('mongoose');
const {DB_NAME} = process.env;


const conexion = async () => {

    try {
        
        await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`)

        console.log("Se ha hecho una conexión exitosa a la base de datos");

    } catch (error) {
        
        console.log(error);

        throw new Error ("No se ha podido conectar con la base de datos");

    }

    
}

module.exports = {conexion};