const Articulo = require("../../modelos/Articulo")

const deleteArticuloDb = (id) => {

    if(id){

        return Articulo.findOneAndDelete({

            _id : id

        });

    }

}

module.exports = deleteArticuloDb;