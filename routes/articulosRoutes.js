const {Router} = require('express')
const crear = require('../handlers/articuloHandlers')

const articulosRoutes = Router();

articulosRoutes.post("/crear", crear);



module.exports = articulosRoutes;