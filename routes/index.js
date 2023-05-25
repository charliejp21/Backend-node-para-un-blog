const {Router} = require('express');
const articulosRoutes  = require('./articulosRoutes')
//const genresRoutes = require('./genresRoutes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();


router.use("/articulos", articulosRoutes)

module.exports = router;