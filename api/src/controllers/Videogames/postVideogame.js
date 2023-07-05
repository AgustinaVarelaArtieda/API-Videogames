const {Videogame,Genres}=require('../../db')  //traigo los modelos desde la BASEDEDATOS


const createVideogame= async(name,image,description,platforms,releaseDate,rating,genre)=>{        //recibo por parametro lo que se ingresa en el form

    if(![name,image,description,platforms,releaseDate,rating].every(Boolean)){  //esto verifica que toda la info requerida sea subida
        return 'faltan datos'
    }else{
        //para crear un nuevo juego
        const newGame= await Videogame.create({name,image,description,platforms,releaseDate,rating})

        await newGame.addGenres(genre)    //para agregar el genero del juego(que viene del modelo GENRES)
        
        return newGame
    }
}

module.exports=createVideogame