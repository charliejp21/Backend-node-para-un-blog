const Articulo = require("../../modelos/Articulo")

const buscarArticuloDb = (busqueda) => {

    if(busqueda){

        return Articulo.find({"$or": [

            {"titulo": {"$regex": busqueda, "$options": "i"}},
            {"contenido": {"$regex": busqueda, "$options": "i"}}

        ]})
        .sort({fecha: -1})
        .exec()

    }

}

module.exports = buscarArticuloDb;