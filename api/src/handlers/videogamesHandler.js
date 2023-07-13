const {getAllVideogames}=require('../controllers/Videogames/getGames')

const {games_API, games_DB}=require('../controllers/Videogames/videogameById')

const createVideogame=require('../controllers/Videogames/newVideogame')

const getVideogames=async(req,res)=>{
    const {name}=req.query      //por si se recibe un name por query

    try {
        const aux= name? await getAllVideogames(name): await getAllVideogames()
    
        res.status(200).json(aux)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getVideogamesById=async(req,res)=>{
    const {id}=req.params
    
    try {
        const source = isNaN(id)? await games_DB(id) : await games_API(id)
        
        res.status(200).json(source)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const postVideogames=async(req,res)=>{
    const {name,image,description,platforms,released,rating,genre}=req.body; 

    try {
        const newGame= await createVideogame(name,image,description,platforms,released,rating,genre)
        
        res.status(200).json(newGame)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
}

module.exports={
    getVideogames,
    getVideogamesById,
    postVideogames
}