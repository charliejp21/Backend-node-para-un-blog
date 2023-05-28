const Articulo = require("../../modelos/Articulo")

const updateArticuloDb = (id, titulo, contenido) => {

    if(id){

        return Articulo.findOneAndUpdate(

            {_id: id},
            {titulo: titulo, contenido:  contenido},
            {new: true}

        )

    }

}

const updateArticuloImg = (id, imgFilename) => {

    if(id){

        return Articulo.findOneAndUpdate(

            {_id: id},
            {imagen: imgFilename},
            {new: true}

        )

    }

}

module.exports = {updateArticuloDb, updateArticuloImg};