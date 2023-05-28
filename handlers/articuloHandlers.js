const validarArticulo = require('../helpers/validarArticulo')
const postArticulo = require('../controladores/articulos/articulo')
const conseguirArticulos = require('../controladores/articulos/conseguirArticulos')
const deleteArticuloDb = require('../controladores/articulos/deleteArticulo')
const buscarArticuloDb = require('../controladores/articulos/buscarArticulos')
const {updateArticuloDb, updateArticuloImg} = require('../controladores/articulos/updateArticulo')
const path = require("path")
const fs = require("fs");

const crear = async (req, res) => {

    const {titulo,contenido} = req.body;

    try {

        validarArticulo(titulo, contenido)
        
    } catch (error) {

        return res.status(404).json({

            status: "error",
            mensaje: error.message,

        });
        
    }

    try {

        const nuevoArticulo = await postArticulo(titulo,contenido);
        
        return res.status(200).json({

            status: "succes",
            articulo: nuevoArticulo,
            mensaje: "Articulo guardado con éxito"

        })
        
    } catch (error) {

        return res.status(500).json({

            status: "error",
            mensaje: "No fue posible crear el artículo",

          });
        
    }

}

const getArticulos = async (req, res) => {

    try {

        const consulta = await conseguirArticulos()

        if(consulta.length){

            return res.status(200).send({

                status: "succes",
                articulos: consulta,
                mensaje: "Articulos obtenidos exitosamente"
    
            })

        }else{

            return res.status(404).json({

                status: "error",
                mensaje: "No hay articulos para mostrar",
    
            });

        }
        
    } catch (error) {
        
        return res.status(500).json({

            status: "error",
            mensaje: "No fue posible cargar los recursos del servidor",

          });

    }

}

const getArticulosUltimos = async (req, res) => {

    const {ultimos} = req.params;

    const ultimosNumero = Number(ultimos);

    if (isNaN(ultimosNumero)) {
      
      return res.status(400).json({
        status: "error",
        mensaje: "El valor proporcionado no es un número válido para obtener los úlitmos articulos",

      });

    }

    try {

        const consulta = await conseguirArticulos(ultimos, undefined)

        if(consulta.length){

            return res.status(200).send({

                status: "succes",
                articulos: consulta,
                mensaje: "Últimos artículos recibidos exitosamente"
    
            })

        }else{

            return res.status(404).json({

                status: "error",
                mensaje: "No se han encontrado últimos articulos para mostrar",
    
            });

        }
        
    } catch (error) {
        
        return res.status(500).json({

            status: "error",
            mensaje: "No fue posible cargar últimos articulos",

          });

    }

} 

const getArticuloById = async(req, res) => {

    const {id} = req.params;

    try {

        const consulta = await conseguirArticulos(undefined, id);

        if(consulta){

            return res.status(200).send({

                status: "succes",
                articulos: consulta,
                mensaje: "Articulo obtenido exitosamente"
    
            })

        }else{

            return res.status(404).json({

                status: "error",
                mensaje: "Articulo no encontrado",
    
            });


        }
        
        
    } catch (error) {
        
       return res.status(500).json({

            status: "error",
            mensaje: "No fue posible cargar el artículo"

          });

    }

}

const deleteArticuloById = async(req, res) => {

    const {id} = req.params;

    try {

        const borrar = await deleteArticuloDb(id);
        
        if(borrar){

            return res.status(200).send({

                status: "success",
                articulo: borrar,
                mensaje: "Articulo borrado exitosamente"
  
              });

        }

    }catch(error){

        return res.status(404).send({

            status: "error",
            mensaje: "No se encontró el articulo con el id proporcionado"

        });

    }

    return res.status(500).json({

        status: "error",
        mensaje: "Error al borrar"

    });

}

const updateArticulo = async(req, res) =>{

    const {id} = req.params;

    const {titulo, contenido} = req.body;

    try {

        validarArticulo(titulo, contenido)
        
    } catch (error) {

        return res.status(404).json({

            status: "error",
            mensaje: error.message,

        });
        
    }

    try {

        const update = await updateArticuloDb(id, titulo, contenido)

        if(update){

           return res.status(200).send({

                status: "succes",
                articulo: update,
                mensaje: "Articulo actualizado exitosamente"
    
            })

        }
    
    } catch (error) {
        
        return res.status(404).send({

            status: "error",
            id: id,
            mensaje: "No fue posible encontrar el articulo con el id proporcionado"

        })

    }

    return res.status(500).json({

        status: "error",
        mensaje: "Erro del servidor al actualizar",

    });

}

const subirImagen = async(req, res) => {

    const imagen = req.file;

    const {id} = req.params;
    
    if(!imagen && !req.files){

        return res.status(404).json({

            status: "error",
            mensaje: "Petición inválida",

        });
    } 

    try {

        const nombreImg = imagen.originalname;

        const archivoSplit = nombreImg.split("\.");

        const extension = archivoSplit[1]

        if(extension != "png" && extension !="jpg" && extension !="jpeg" && extension !="gif"){

            fs.unlink(imagen.path, (error) => {

                return res.status(400).json({

                    status: "error",
                    mensaje: "Imagen invalida",

                })

            })

        }else{

            const update = await updateArticuloImg(id, imagen.filename)

            if(update){

                res.status(200).send({

                    status: "succes",
                    articulo: update,
                    fichero: imagen,
                    mensaje: "Articulo actualizado exitosamente"
        
                })

            }

        }
        
    } catch (error) {

        res.status(500).json({

            status: "error",
            mensaje: "Error al subir imagen",

        });
        
    }


}

const getImagen = (req, res) => {

    const {titleImg} = req.params;

    try {

        const rutaFisica = "./imagenes/articulos/" + titleImg;

        fs.stat(rutaFisica, (error, exsiste) => {

        if(exsiste){

           return res.status(200).sendFile(path.resolve(rutaFisica))

        }else{

            return res.status(404).json({

                status: "error",
                mensaje: "Imagen no encontrada",
                exsiste,
                titleImg,
                rutaFisica
    
            });

        }

    })
        
    } catch (error) {

        res.status(500).json({

            status: "error",
            mensaje: "Error al buscar imagen",

        });
        
    }

}

const buscarArticulo = async (req, res) => {

    const {busqueda} = req.params;

    console.log(busqueda)

    try {

        const buscar = await buscarArticuloDb(busqueda)

        if(buscar.length){

            return res.status(200).send({

                status: "succes",
                articulos: buscar,
                mensaje: "Búsqueda obtenida exitosamente"
    
            })

        }else{

            return res.status(404).json({

                status: "error",
                mensaje: "No se encontraron articulos para mostrar, pruebe con otras palabras",
    
            });

        }
        
    } catch (error) {
        
        return res.status(500).json({

            status: "error",
            mensaje: "Error del servidor al buscar",

          });

    }

}

module.exports = {crear, getArticulos, getArticulosUltimos, getArticuloById, deleteArticuloById, updateArticulo, subirImagen, getImagen, buscarArticulo};