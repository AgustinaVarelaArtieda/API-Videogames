const axios=require('axios')
const {Op}=require('sequelize')

const {Videogame, Genres} = require('../../db')

const {API_KEY}=process.env

//Realizo las peticiones de los juegos a la API
const games_API=async(id)=>{
    const url=`https://api.rawg.io/api/games/${id}?key=${API_KEY}`

    const {data} = await axios.get(url);
    
    const gameInfo = {
            id:data.id,
            name:data.name,
            description:data.description,
            image:data.background_image,
            platforms:data.platforms?.map(el=>el.platform.name),
            released:data.released,
            rating:data.rating,
            genres:data.genres?.map(el=>el.name)
        }
        
    return gameInfo;
}

//Realizo las peticiones de los juegos guardados en la DB
const games_DB=async(id)=>{
    return await Videogame.findAll({
        where:{
            id:{[Op.eq]: `${id}`}
        },
        include:{
            model: Genres,
            attributes:['name'],
            trough:{
                attributes:[]
            }
        }
    })
}

module.exports={
    games_API,
    games_DB
}