const {Router} = require('express')
const multer = require("multer")
const {crear, getArticulos, getArticulosUltimos, getArticuloById, deleteArticuloById, updateArticulo, subirImagen, getImagen, buscarArticulo} = require('../handlers/articuloHandlers')

const almacenamiento = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, './imagenes/articulos')

    },

    filename: (req, file, cb) => {

        cb(null, "articulo" + Date.now() + file.originalname)
        
    }

})

const uploads = multer({storage: almacenamiento})

const articulosRoutes = Router();

articulosRoutes.get("/", getArticulos)
articulosRoutes.get("/buscar/:busqueda", buscarArticulo)
articulosRoutes.get("/id/:id", getArticuloById)
articulosRoutes.delete("/id/:id", deleteArticuloById)
articulosRoutes.put("/id/:id", updateArticulo)
articulosRoutes.get("/ultimos/:ultimos", getArticulosUltimos)
articulosRoutes.post("/crear", crear);
articulosRoutes.post("/subir-imagen/:id", [uploads.single("file0")], subirImagen);
articulosRoutes.get("/imagen/:titleImg", getImagen)




module.exports = articulosRoutes;