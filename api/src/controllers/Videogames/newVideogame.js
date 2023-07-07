const {Videogame,Genres}=require('../../db')  //traigo los modelos desde la BASEDEDATOS

const {Op}=require('sequelize')

const createVideogame= async(data)=>{        //recibo por parametro lo que se ingresa en el form
    const {name,image,description,platforms,releaseDate,rating,genres}=data

    const newVideogame=await Videogame.create({
        name,
        image,
        description,
        platforms,
        releaseDate,
        rating,
        genres
    })
    
    // if(!name||!image||!description||!platforms||!releaseDate||!rating){  //esto verifica que toda la info requerida sea subida
    //     return 'faltan datos'
    // }

    let genresDB= await Genres.findAll({    //para agregar el genero del juego(que viene del modelo GENRES)
       where:{name:genre}
   })

  newVideogame.addGenres(genresDB) //agrego un nuevo genres a la DB

  return newVideogame
    // }
}

module.exports=createVideogame