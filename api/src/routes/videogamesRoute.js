const { Router } = require('express');

const { getVideogames, getVideogamesById, postVideogames }=require('../handlers/videogamesHandler')

const videogames=Router()

videogames.get('/', getVideogames);  //all or name

videogames.get('/:id', getVideogamesById);  //id

videogames.post('/', postVideogames ); //create 

module.exports=videogames