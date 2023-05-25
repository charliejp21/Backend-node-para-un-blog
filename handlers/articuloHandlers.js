const validator = require('validator');
const postArticulo = require('../controladores/articulo')

const crear = async (req, res) => {

    const {titulo,contenido} = req.body;

    try {

        const validar_titulo = !validator.isEmpty(titulo) && validator.isLength(titulo, {min: 5, max:undefined});
        const validar_contenido = !validator.isEmpty(contenido);

        if(!validar_titulo || !validar_contenido){

            throw new Error("No se ha validado la información")
        }

        const nuevoArticulo = await postArticulo(titulo,contenido);
        
        res.status(200).json(nuevoArticulo)
        
    } catch (error) {

        res.status(404).json({error: error.message});
        
    }

}

module.exports = crear;