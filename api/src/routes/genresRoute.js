const { Router } = require('express');

const getGenresApi=require('../handlers/genresHandler')

const genre=Router()

genre.get('/',getGenresApi); //obtengo un ARRAY con los generos de la API

module.exports=genre