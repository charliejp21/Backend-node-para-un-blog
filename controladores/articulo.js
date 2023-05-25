const Articulo = require("../modelos/Articulo")

const postArticulo = (titulo, contenido) => {

    const articuloPost = new Articulo({

        titulo: titulo,
        contenido: contenido

        });

    return articuloPost.save()

        .then(articuloGuardado => articuloGuardado)

        .catch(error => {

            throw error;

        }) 
    
}

module.exports = postArticulo;