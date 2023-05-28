const Articulo = require("../../modelos/Articulo")

const conseguirArticulos = (ultimos, id) => {

    if(ultimos){

        return Articulo.find({}).limit(ultimos).sort({fecha: -1})

    }
    
    if(id){

        return Articulo.findById(id);

    }

    return Articulo.find({})

}

module.exports = conseguirArticulos;
