const {Videogame,Genres}=require('../../db')  //traigo los modelos desde la BASEDEDATOS

const {Op}=require('sequelize')

const createVideogame= async(name,image,description,platforms,released,rating,genres)=>{        //recibo por parametro lo que se ingresa en el form
    
    //para evitar que se cree un juego con algun dato faltante
    if(!name||!image||!description||!platforms||!released||!rating||!genres)throw Error('faltan datos')

    let newVideogame= await Videogame.findOne({       //busco si el nombre del juego ya existe en mi DB
        where:{name:{[Op.iLike]: `${name}`}}
    })

    //Para evitar que se cree el mismo juego dos veces
    if(newVideogame) throw Error(`El juego ${name} ya fue creado, su id es ${newVideogame.id}`)
    
    //Para crear un nuevo juego
    newVideogame=await Videogame.create({     //creo un nuevo juego en mi DB
        name: name,
        description: description,
        platforms: platforms,
        image: image,
        released: released,
        rating: rating,
    })

    const genreObj = await Genres.findOne({ where: { name: genres } });
    await newVideogame.addGenres(genreObj);             //envio los generos ingresados a mi modelo genres
         
    newVideogame=await Videogame.findByPk(newVideogame.id, {        //conecto el nuevo juego con mi modelo Genres mediante el id del nuevo juego
        include: {
            model: Genres,
            attributes:['name'],
            through:{attributes:[]}
        }
    })
    
    return newVideogame
}

module.exports=createVideogame