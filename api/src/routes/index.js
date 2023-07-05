const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genreRoute=require('./genresRoute')
const gameRoute=require('./videogamesRoute')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames',gameRoute)
router.use('/genres',genreRoute)

module.exports = router;
