const validator = require('validator');

const validarArticulo = (titulo, contenido) => {

    const validar_titulo = !validator.isEmpty(titulo) && validator.isLength(titulo, {min: 5, max:undefined});

    const validar_contenido = !validator.isEmpty(contenido);

    if(!validar_titulo || !validar_contenido){

        throw new Error("Información erronea, revisa los datos")

    }


}

module.exports = validarArticulo;